<script lang="ts">
  import { initBoxes } from '$lib/dom/boxContext';
  import { initStates, reifyStates } from '$lib/dom/state';

  import ServerPool from '$lib/dom/ServerPool.svelte';
  import Component from '$lib/dom/Component.svelte';
  import TopologyContainer from '$lib/dom/TopologyContainer.svelte';
  import Controls from '$lib/dom/Controls.svelte';

  import SCRIPT from './data-source.yaml';

  const { steps, lines: lineConfigs, boxes: boxConfigs } = SCRIPT;

  initBoxes();

  const states = initStates();
  const reifiedStates = reifyStates(steps);

  let currentStep: number = 0;
  $: states.set(reifiedStates[currentStep] ?? {});
</script>

<div class="space-y-2 justify-center font-mono">
  <TopologyContainer {lineConfigs} {boxConfigs}>
    <div class="relative grid topology gap-6 justify-center items-center">
      <Component classes="col-start-3" id="featureflags" name="Feature Flags" small />
      <Component classes="col-start-1" id="client" name="Client" />

      <Component id="gateway" name="Gateway" />

      <div class="grid gap-2">
        <ServerPool id="subgraph-a" name="Products" schema="A" code={0} />
        <Component id="subgraph-b" name="Reviews" small />
      </div>

      <div class="grid gap-2">
        <Component id="database" name="Database" />
        <Component id="rest" name="REST API" small />
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
