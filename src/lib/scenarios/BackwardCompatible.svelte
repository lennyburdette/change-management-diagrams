<script lang="ts">
  import { initBoxes } from '$lib/dom/boxContext';
  import { initStates, reifyStates } from '$lib/dom/state';

  import ServerPool from '$lib/dom/ServerPool.svelte';
  import Tasks from '$lib/dom/Tasks.svelte';
  import Component from '$lib/dom/Component.svelte';
  import TopologyContainer from '$lib/dom/TopologyContainer.svelte';
  import Controls from '$lib/dom/Controls.svelte';
  import Cloud from '$lib/svg/icons/Cloud.svelte';

  import SCRIPT from './backward-compatible.yaml';

  const { steps, tasks, lines: lineConfigs, boxes: boxConfigs } = SCRIPT;

  initBoxes();

  const states = initStates();
  const reifiedStates = reifyStates(steps);

  let currentStep: number = 0;
  $: states.set(reifiedStates[currentStep] ?? {});
</script>

<div class="space-y-2 justify-center font-mono">
  <Tasks {tasks} />

  <TopologyContainer {lineConfigs} {boxConfigs}>
    <div class="relative grid topology gap-6 justify-center items-center">
      <Component classes="col-start-2" id="studio" hidePlaceholder>
        <Cloud slot="icon" />
        Apollo<br />Studio
      </Component>

      <Component classes="col-start-1" id="client" name="Client" />

      <div class="grid gap-2">
        <ServerPool id="gateway-blue" name="Gateway" variant="prod" schema="AX" code={1} />
      </div>

      <div class="grid gap-2">
        <ServerPool id="subgraph-a" name="Products" schema="A" code={0} />
        <ServerPool id="subgraph-b" name="Reviews" schema="X" code={2} />
      </div>

      <div class="grid gap-2">
        <Component id="database" name="Database" />
        <Component id="rest" name="REST API" />
      </div>
    </div>
  </TopologyContainer>
</div>

<Controls {steps} bind:currentStep />

<style>
  .topology {
    grid-template-columns: repeat(5, max-content);
  }
</style>
