<script lang="ts">
  import { onMount } from 'svelte';
  import { backOut } from 'svelte/easing';
  import { scale } from 'svelte/transition';

  const code1 = `type Query {
  product(id: ID!): Product
}

type Product @key(fields: "id") {
  id: ID!
  name: String`;

  const removal = `  color: String
`;

  const code2 = `  variation: Variation
  reviews: [Review]
}
`;

  let removed = false;

  onMount(() => {
    setTimeout(() => (removed = true), 1000);
  });
</script>

<div class="absolute inset-0 grid place-content-center">
  <div class="mx-28 ">
    <h1 class="text-3xl mb-4">Product subgraph</h1>
    <pre
      class="text-2xl font-mono text-gray-700"><code>{code1}
<span class="relative inline-block font-bold transition-all duration-300" class:text-red-900={removed} class:bg-red-100={removed}>{#if removed}<span in:scale={{ easing: backOut, duration: 300 }} class="absolute top-[50%] w-full border-2 border-black h-1 transition-all"></span>{/if}{removal}</span>
{code2}</code></pre>
  </div>
</div>
