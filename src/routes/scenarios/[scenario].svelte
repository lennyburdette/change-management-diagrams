<script context="module" lang="ts">
  import { scenarios } from '$lib/scenarios/index';

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch, session, stuff }) {
    const scenario = scenarios.find((s) => s.slug === page.params.scenario);
    if (!scenario) {
      return { status: 404 };
    }

    return {
      props: {
        scenario
      }
    };
  }
</script>

<script lang="ts">
  import Legend from '$lib/dom/Legend.svelte';

  export let scenario: { slug: string; title: string; component: any };
</script>

<svelte:head>
  <title>{scenario.title}</title>
</svelte:head>

<div class="flex justify-between">
  <h1 class="text-lg mb-2">{scenario.title}</h1>
  <Legend />
</div>

<svelte:component this={scenario.component} />
<slot />
