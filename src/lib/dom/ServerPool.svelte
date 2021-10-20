<script lang="ts">
  import { getBoxes, registerBox } from './boxContext';
  import { getState } from './state';
  import { createMachine, assign, EventData } from 'xstate';
  import { useMachine } from '$lib/fsm';
  import Server from './Server.svelte';
  import { fly } from 'svelte/transition';

  const boxes = getBoxes();

  export let id: string;
  export let name: string;
  export let cluster: 'Blue' | 'Green' | undefined = undefined;
  export let variant: string | undefined = undefined;
  export let code: number;
  export let schema: string;

  const stateMessages = getState(id);

  interface TContext {
    active: boolean;
    code: number;
    schema: string;
    deployed: number;
  }

  interface TEvent {
    type: string;
    kind: string;
    active?: boolean;
    code?: number;
    schema?: string;
    version?: number;
  }

  const fsm = createMachine<TContext, TEvent>({
    context: {
      active: false,
      code,
      schema,
      deployed: 0
    },
    initial: 'idle',
    states: {
      idle: {
        entry: assign({
          active: (_) => false,
          code,
          schema,
          deployed: 0
        }),
        on: {
          ACTIVE: 'active',
          SCHEMA: 'schema',
          DEPLOY: 'deploy',
          ROLLING_DEPLOY: 'rollingdeploy'
        }
      },
      active: {
        entry: assign({
          active: (_) => true
        }),
        on: {
          SCHEMA: 'schema',
          DEPLOY: 'deploy',
          ROLLING_DEPLOY: 'rollingdeploy',
          DEFAULT: 'idle'
        }
      },
      schema: {
        entry: assign({
          active: (_ctx, evt) => evt.active ?? false,
          schema: (_, evt) => evt.schema ?? schema,
          deployed: 3
        }),
        on: {
          ACTIVE: 'active',
          DEPLOY: 'deploy',
          ROLLING_DEPLOY: 'rollingdeploy',
          SCHEMA: 'schema',
          DEFAULT: 'idle'
        }
      },
      deploy: {
        entry: assign({
          active: (_ctx, evt) => evt.active ?? false,
          code: (_, evt) => evt.code ?? code,
          schema: (_, evt) => evt.schema ?? schema,
          deployed: 3
        }),
        on: {
          ACTIVE: 'active',
          SCHEMA: 'schema',
          ROLLING_DEPLOY: 'rollingdeploy',
          DEFAULT: 'idle'
        }
      },
      rollingdeploy: {
        entry: assign({
          active: (_) => true,
          code: (_, evt) => evt.code ?? code,
          schema: (_, evt) => evt.schema ?? schema,
          deployed: 0
        }),
        on: {
          ACTIVE: 'active',
          SCHEMA: 'schema',
          DEPLOY: 'deploy',
          DEFAULT: 'idle'
        },
        initial: 'one',
        states: {
          one: {
            entry: assign({ deployed: 1 }),
            after: { 1000: 'two' }
          },
          two: {
            entry: assign({ deployed: 2 }),
            after: { 1000: 'three' }
          },
          three: {
            entry: assign({ deployed: 3 })
          }
        }
      }
    }
  });

  const { state, send } = useMachine(fsm);

  stateMessages.subscribe((value) => {
    if (value) {
      // value has a .type but xstate doesn't like that
      send(value.type, value as EventData);
    }
  });

  function makeServers(
    deployed: number,
    schemas: { old: string; new: string },
    codes: { old: number; new: number }
  ) {
    const out = [];
    for (let i = 0; i < 3; i++) {
      if (i >= deployed) {
        out.push({ code: codes.old, schema: schemas.old });
      } else {
        out.push({ code: codes.new, schema: schemas.new });
      }
    }
    return out;
  }

  $: servers = makeServers(
    $state.context.deployed,
    { old: schema, new: $state.context.schema },
    { old: code, new: $state.context.code }
  );

  $: visible = $stateMessages.type !== 'HIDE';
</script>

{#if visible}
  <div in:fly out:fly class="grid justify-center">
    <div class="text-center text-xl">
      {name}
      {#if cluster}
        <span
          class="px-1 rounded-sm bg-blue-500 text-white text-xs uppercase"
          class:bg-blue-500={cluster === 'Blue'}
          class:bg-green-500={cluster === 'Green'}
        >
          {cluster}
        </span>
      {/if}
    </div>
    <div
      class="border border-gray-200 bg-white rounded shadow overflow-hidden transition-all"
      use:registerBox={{ id, boxes }}
      class:bg-brand-light={$state.context.active}
      class:border-brand-dark={$state.context.active}
      class:shadow-lg={$state.context.active}
      class:-translate-y-1={$state.context.active}
    >
      {#if variant}
        <div class="px-1 text-xs border-b bg-gray-300 text-gray-800 text-center">
          my-graph@{variant}
        </div>
      {/if}
      <div class="relative p-4 grid grid-flow-col items-stretch gap-1">
        {#each servers as server}
          <Server {...server} />
        {/each}
      </div>
    </div>
  </div>
{/if}
