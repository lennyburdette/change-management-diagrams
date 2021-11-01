<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import { initStates, reifySteps } from '$lib/dom/state';
  import { initBoxes } from '$lib/dom/boxContext';

  import Step from '$lib/dom/Step.svelte';
  import ProgressBar from '$lib/ProgressBar.svelte';
  import Component from '$lib/dom/Component.svelte';
  import TopologyContainer from '$lib/dom/TopologyContainer.svelte';
  import ApolloStudio from '$lib/dom/ApolloStudio.svelte';
  import Subgraph from '$lib/dom/Subgraph.svelte';
  import Router from '$lib/dom/Router.svelte';
  import Slide from '$lib/slides/Slide.svelte';

  import SCRIPT from '$lib/presentation.yaml';
  import { initPlayer } from '$lib/slides/player';
  import ShowHide from '$lib/dom/ShowHide.svelte';
  import Clock from '$lib/svg/icons/Clock.svelte';
  import SlackMessage from '$lib/dom/SlackMessage.svelte';
  import Hooray from '$lib/dom/Hooray.svelte';

  const reifiedSteps = reifySteps(SCRIPT.steps);

  const stateStore = initStates();
  initBoxes();

  const { currentStep, next, prev, jump, progress, index } = initPlayer(reifiedSteps);

  $: $stateStore = $currentStep?.states;

  let notesWindow: Window | undefined;
  onMount(() => {
    if (window.location.hash) {
      const index = parseInt(window.location.hash.slice(1), 10);
      if (!isNaN(index)) jump(index);
    }
    index.subscribe((s) => {
      window.location.hash = `${s}`;
      console.log('update');
      notesWindow?.postMessage({ index: s }, '*');
    });

    notesWindow = window.open('', 'presentationnotes');

    document.addEventListener(
      'keydown',
      function (e) {
        if (e.key === 'n' || e.key === ' ' || e.key === 'ArrowRight') {
          next();
        } else if (e.key === 'p' || e.key === 'Backspace' || e.key === 'ArrowLeft') {
          prev();
        } else if (e.key === 'f') {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        } else if (e.key === 'z') {
          notesWindow = window.open('/presentation/notes', 'presentationnotes');
        }
      },
      false
    );

    window.addEventListener('message', ({ data }) => {
      if (data === 'refresh') {
        index.subscribe((s) => notesWindow?.postMessage({ index: s }, '*'))();
      } else if (data === 'next') {
        next();
      } else if (data === 'prev') {
        prev();
      }
    });
  });
</script>

<Slide />

<ProgressBar value={$progress} />

<div class="h-[100vh] flex flex-col space-y-4">
  <ShowHide id="first-pipeline">
    <div class="m-6 mb-0">
      <ShowHide id="first-pipeline-title">
        <p class="mb-2">Products Release Pipeline</p>
      </ShowHide>
      <div class="flex flex-row space-x-2 text-sm font-mono">
        <div class="flex-1">
          <Step id="task-merge-pr" label="Merge PR" />
        </div>

        <div class="flex-1 grid gap-2">
          <Step id="task-tests" label="Run Tests" />
          <Step id="task-checks" label="rover subgraph check" />
        </div>

        <div class="flex-1 grid gap-2">
          <Step id="task-build-sdl" label="Build Subgraph SDL" />
          <Step id="task-build-artifact" label="Build Deployable" />
        </div>

        <ShowHide id="task-timer">
          <div class="h-full grid place-content-center"><Clock /></div>
        </ShowHide>

        <ShowHide id="task-checks-2-container">
          <Step id="task-checks-2" label="rover subgraph check" />
        </ShowHide>

        <div class="flex-1">
          <Step id="task-deploy" label="Initiate Deploy" />
        </div>

        <div class="flex-1">
          <Step id="task-publish" label="rover subgraph publish" terminal />
        </div>
      </div>
    </div>
  </ShowHide>

  <ShowHide id="second-pipeline">
    <div class="mx-6 mb-0">
      <p class="mb-2">Reviews Release Pipeline</p>
      <div class="flex flex-row space-x-2 text-sm font-mono">
        <div class="flex-1">
          <Step id="task2-merge-pr" label="Merge PR" />
        </div>

        <div class="flex-1 grid gap-2">
          <Step id="task2-tests" label="Run Tests" />
          <Step id="task2-checks" label="rover subgraph check" hasSkip />
        </div>

        <div class="flex-1 grid gap-2">
          <Step id="task2-build-sdl" label="Build Subgraph SDL" />
          <Step id="task2-build-artifact" label="Build Deployable" />
        </div>

        <div class="flex-1">
          <Step id="task2-deploy" label="Initiate Deploy" />
        </div>

        <div class="flex-1">
          <Step id="task2-publish" label="rover subgraph publish" terminal />
        </div>
      </div>
    </div>
  </ShowHide>

  <TopologyContainer
    lineConfigs={SCRIPT.lines}
    boxConfigs={[
      {
        contain: ['router', 'beta-router', 'subgraph-a', 'subgraph-b', 'database', 'rest'],
        p: 20,
        pt: 38
      }
    ]}
  >
    <div class="relative grid col-5-flex gap-10 justify-center items-center">
      <Component classes="col-start-1" id="laptop" hidePlaceholder>Laptop</Component>

      <ApolloStudio classes="col-start-2" />

      <div class="col-start-1">
        <Component id="beta-client" name="Beta clients" />
        <Component id="client" name="Client apps" />
      </div>

      <div class="space-y-4">
        <Router id="beta-router" name="Router" variant="beta" schema="AX" code={1} />
        <Router id="router" name="Router" variant="prod" schema="AX" code={1} />
      </div>

      <div class="grid gap-6">
        <Subgraph id="subgraph-a" name="Products" schema="A" code={0} />
        <Subgraph id="subgraph-b" name="Reviews" schema="X" code={2} />
      </div>

      <div class="grid gap-6">
        <Component id="rest" name="REST API" />
        <Component id="database" name="Database" />
      </div>
    </div>
  </TopologyContainer>

  <SlackMessage id="slack" />
  <Hooray />
</div>
<slot />

<style>
  .col-5-flex {
    grid-template-columns: repeat(5, max-content);
  }
</style>
