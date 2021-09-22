<script lang="ts">
	import { getBoxes, registerBox } from './boxContext';
	import { getState } from './state';
	import { createMachine, assign } from 'xstate';
	import { useMachine } from '$lib/fsm';
	import Server from './Server.svelte';

	const boxes = getBoxes();

	export let id: string;
	export let name: string;
	export let cluster: 'Blue' | 'Green' | undefined = undefined;
	export let variant: string | undefined = undefined;

	const stateMessages = getState(id);

	interface TContext {
		active: boolean;
		code: number;
		schema: number;
		deployed: number;
	}

	interface TEvent {
		type: string;
		kind: string;
		active?: boolean;
		code?: number;
		schema?: number;
		version?: number;
	}

	const fsm = createMachine<TContext, TEvent>({
		context: {
			active: false,
			code: 0,
			schema: 0,
			deployed: 0
		},
		initial: 'idle',
		states: {
			idle: {
				entry: assign({
					active: (_) => false,
					code: 0,
					schema: 0,
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
					active: (_ctx, evt) => evt.active ?? false,
					code: 0,
					schema: 0
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
					schema: (_, evt) => evt.schema,
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
					code: (_, evt) => evt.code,
					schema: (_, evt) => evt.schema,
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
					code: (_, evt) => evt.code,
					schema: (_, evt) => evt.schema,
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
			send(value.type, value);
		}
	});
</script>

<div class="grid justify-center">
	<div class="text-center">
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
		class="border border-gray-300 bg-white rounded shadow transition-all"
		use:registerBox={{ id, boxes }}
		class:bg-brand-light={$state.context.active}
		class:border-brand-dark={$state.context.active}
		class:shadow-lg={$state.context.active}
		class:-translate-y-1={$state.context.active}
	>
		{#if variant}
			<div class="px-1 text-xs border-b bg-gray-300 text-gray-800 text-center rounded">
				Variant: {variant}
			</div>
		{/if}
		<div class="relative p-2 grid grid-flow-col items-stretch gap-1">
			{#each new Array(3) as _, i}
				<Server
					deployed={$state.context.deployed > i}
					codeVersion={$state.context.code ?? 0}
					schemaVersion={$state.context.schema ?? 0}
				/>
			{/each}
		</div>
	</div>
</div>
