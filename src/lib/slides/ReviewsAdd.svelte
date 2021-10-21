<script lang="ts">
  import { onMount } from 'svelte';
  import { backOut } from 'svelte/easing';
  import { scale } from 'svelte/transition';

  const code1 = `extend type Product @key(fields: "id") {
  id: ID! @external
`;

  const addition = `  reviews: [Review]
`;

  const code2 = `
}
`;

  let added = false;

  onMount(() => {
    setTimeout(() => (added = true), 1000);
  });
</script>

<div class="absolute inset-0 grid place-content-center">
  <div class="mx-28 ">
    <h1 class="text-3xl mb-4">Reviews subgraph</h1>
    <pre
      class="text-2xl font-mono text-gray-700"><code>{code1}{#if added}<span in:scale={{ easing: backOut, duration: 300 }} class="inline-block text-green-900 bg-green-100 font-bold">{addition}</span>{/if}{code2}</code></pre>
  </div>
</div>
