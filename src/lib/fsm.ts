import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { interpret, State } from 'xstate';
import type {
  Event,
  EventObject,
  EventData,
  SingleOrArray,
  SCXML,
  StateMachine,
  InterpreterOptions,
  MachineOptions,
  StateConfig,
  Typestate,
  Interpreter
} from 'xstate';

interface UseMachineOptions<TContext extends Record<string, unknown>, TEvent extends EventObject> {
  /**
   * If provided, will be merged with machine's `context`.
   */
  context: Partial<TContext>;
  /**
   * The state to rehydrate the machine to. The machine will
   * start at this state instead of its `initialState`.
   */
  state: StateConfig<TContext, TEvent>;
}

export function useMachine<
  TContext extends Record<string, unknown>,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext>
>(
  machine: StateMachine<TContext, unknown, TEvent, TTypestate>,
  options: Partial<InterpreterOptions> &
    Partial<UseMachineOptions<TContext, TEvent>> &
    Partial<MachineOptions<TContext, TEvent>> = {}
): {
  state: Readable<State<TContext, TEvent, unknown, TTypestate>>;
  send: (
    event: SingleOrArray<Event<TEvent>> | SCXML.Event<TEvent>,
    payload?: EventData
  ) => State<TContext, TEvent, unknown, TTypestate>;
  service: Interpreter<TContext, unknown, TEvent, TTypestate>;
} {
  const {
    context,
    guards,
    actions,
    activities,
    services,
    delays,
    state: rehydratedState,
    ...interpreterOptions
  } = options;

  const machineConfig = {
    context,
    guards,
    actions,
    activities,
    services,
    delays
  };

  const resolvedMachine = machine.withConfig(machineConfig, () => ({
    ...machine.context,
    ...context
  }));

  const service = interpret(resolvedMachine, interpreterOptions).start(
    rehydratedState ? new State(rehydratedState) : undefined
  );

  const state = readable(service.state, (set) => {
    service.subscribe((state) => {
      if (state.changed) {
        set(state);
      }
    });

    return () => {
      service.stop();
    };
  });

  service.send;

  return { state, send: service.send, service };
}
