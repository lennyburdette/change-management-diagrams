import type { State, Step } from '$lib/types';
import { getContext, setContext } from 'svelte';
import { derived } from 'svelte/store';
import type { Readable } from 'svelte/store';

const contextKey = Symbol('STATES');

export function initStates(state: Readable<Step>): Readable<{ [key: string]: State }> {
  const store = derived(state, (step) => step.states);
  setContext(contextKey, store);
  return store;
}

export function getStates(): Readable<{ [key: string]: State }> {
  return getContext(contextKey);
}

const defaultState = { type: 'DEFAULT' };
export function getState(id: string): Readable<State> {
  const store = getStates();
  return derived(store, ($store) => {
    if (id in $store) {
      return $store[id];
    } else {
      return defaultState as State;
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
