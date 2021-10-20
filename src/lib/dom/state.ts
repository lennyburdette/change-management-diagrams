import type { State, Step } from '$lib/types';
import { getContext, setContext } from 'svelte';
import { derived, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';

const contextKey = Symbol('STATES');

export function initStates(): Writable<{ [key: string]: State }> {
  const store = writable({});
  setContext(contextKey, store);
  return store;
}

export function getStates(): Readable<{ [key: string]: State }> {
  return getContext(contextKey);
}

export function getState(id: string): Readable<State> {
  const store = getStates();
  return derived(store, ($store) => {
    if (id in $store) {
      return $store[id];
    } else {
      return { type: 'DEFAULT' } as State;
    }
  });
}

/**
 * combine state changes with previous state changes so that they persist until overridden
 */
export function reifyStates(steps: Step[]): { [key: string]: State }[] {
  const reifiedSteps: { [key: string]: State }[] = [];
  let previous = {};

  for (const step of steps) {
    const reified = { ...previous, ...step.states };
    reifiedSteps.push(reified);
    previous = reified;
  }

  return reifiedSteps;
}

export function reifySteps(steps: Step[]): Step[] {
  const reifiedSteps: Step[] = [];
  let previous = {};

  for (const step of steps) {
    const reified = { ...previous, ...step.states };
    reifiedSteps.push({ ...step, states: reified });
    previous = reified;
  }

  return reifiedSteps;
}
