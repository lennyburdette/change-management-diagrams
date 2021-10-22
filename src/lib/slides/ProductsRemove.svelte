<script lang="ts">
  import CodeFile from '$lib/dom/CodeFile.svelte';
  import { COLORS } from '$lib/dom/Server.svelte';
  import { onMount } from 'svelte';
  import { backOut } from 'svelte/easing';
  import { scale } from 'svelte/transition';

  const code1 = `type Query {
  product(id: ID!): Product
}

type Product @key(fields: "id") {
  id: ID!
  name: String
  color: String
  variation: Variation`;

  const removal = `  reviews: [Review]
`;

  const code2 = `}
`;

  let label = false;
  let nextFile = false;
  let removed = false;

  onMount(() => {
    setTimeout(() => (label = true), 1000);
    setTimeout(() => (nextFile = true), 2000);
    setTimeout(() => (removed = true), 2500);
  });
</script>

<div class="absolute inset-0 grid place-content-center bg-gray-50">
  <div class="flex space-x-4">
    <CodeFile>
      <svelte:fragment slot="title">
        Product subgraph
        {#if label}
          <span
            in:scale={{ easing: backOut }}
            class={`inline-block relative px-2 ml-2 rounded -top-1 ${COLORS[0]} uppercase text-lg tracking-wide`}
          >
            Runtime
          </span>
        {/if}
      </svelte:fragment>
      <pre
        class="text-2xl font-mono text-gray-700"><code>{code1}
<span class="relative inline-block font-bold transition-all duration-300">{removal}</span>
{code2}</code></pre>
    </CodeFile>

    {#if nextFile}
      <div in:scale={{ easing: backOut }}>
        <CodeFile>
          <svelte:fragment slot="title">
            Product subgraph
            <span
              class={`inline-block relative px-2 ml-2 rounded -top-1 ${COLORS[3]} uppercase text-lg tracking-wide`}
            >
              For Publishing
            </span>
          </svelte:fragment>
          <pre
            class="text-2xl font-mono text-gray-700"><code>{code1}
<span class="relative inline-block font-bold transition-all duration-300" class:text-red-900={removed} class:bg-red-100={removed}>{#if removed}<span in:scale={{ easing: backOut, duration: 300 }} class="absolute top-[50%] w-full border-2 border-black h-1 transition-all"></span>{/if}{removal}</span>
{code2}</code></pre>
        </CodeFile>
      </div>
    {/if}
  </div>
</div>
