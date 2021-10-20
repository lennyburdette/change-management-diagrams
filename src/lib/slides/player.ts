import type { Step } from '$lib/types';
import { createMachine, assign } from 'xstate';
import { useMachine } from '$lib/fsm';
import { derived } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { getContext, setContext } from 'svelte';

const fsm = createMachine<{ index: number; steps: Step[] }>(
  {
    context: {
      index: 0,
      steps: []
    },
    initial: 'idle',
    states: {
      idle: {
        on: {
          NEXT: 'next',
          PREV: 'prev',
          JUMP: 'jump'
        }
      },
      next: {
        invoke: { src: 'autoplay' },
        entry: 'increment',
        on: {
          AUTO_NEXT: 'next',
          DONE: 'idle',
          JUMP: 'jump'
        }
      },
      prev: {
        entry: 'decrement',
        after: { 1: 'idle' },
        on: {
          JUMP: 'jump'
        }
      },
      jump: {
        entry: assign({
          index: (_, event) => event.index
        }),
        after: { 0: 'idle' }
      }
    }
  },
  {
    services: {
      autoplay:
        ({ index, steps }) =>
        (callback) => {
          const step = steps[index];
          if (step.duration) {
            const id = setTimeout(() => callback('AUTO_NEXT'), step.duration);
            return () => clearTimeout(id);
          } else {
            callback('DONE');
          }
        }
    },

    actions: {
      increment: assign({
        index: ({ index, steps }) => (index + 1 >= steps.length ? 0 : index + 1)
      }),
      decrement: assign({
        index: ({ index, steps }) => (index - 1 < 0 ? steps.length - 1 : index - 1)
      })
    }
  }
);

const PLAYER = Symbol('player');

export function initPlayer(steps: Step[]): {
  currentStep: Readable<Step>;
  next: () => void;
  prev: () => void;
  jump: (i: number) => void;
  progress: Readable<number>;
  index: Readable<number>;
} {
  const existingPlayer = getContext(PLAYER);
  if (!existingPlayer) {
    console.log('init player');
    const { state, send } = useMachine(fsm, {
      context: {
        steps
        // index: (() => {
        //   try {
        //     return window?.location?.hash ? parseInt(window.location.hash, 10) : 0;
        //     // eslint-disable-next-line no-empty
        //   } catch (e) {}
        // })()
      }
    });

    const newPlayer = {
      currentStep: derived(state, (state) => steps[state.context.index]),
      next: () => send('NEXT'),
      prev: () => send('PREV'),
      jump: (i: number) => send('JUMP', { index: i }),
      progress: derived(state, (state) => state.context.index / steps.length),
      index: derived(state, (state) => state.context.index)
    };
    setContext(PLAYER, newPlayer);
  }

  return getContext(PLAYER);
}
