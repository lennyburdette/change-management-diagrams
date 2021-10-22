<script lang="ts">
  import CodeFile from '$lib/dom/CodeFile.svelte';
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
`;

  const addition = `  variation: Variation
`;

  const code2 = `
  reviews: [Review]
}
`;

  let added = false;

  onMount(() => {
    setTimeout(() => (added = true), 1000);
  });
</script>

<div class="absolute inset-0 grid place-content-center bg-gray-50">
  <CodeFile>
    <svelte:fragment slot="title">Products subgraph</svelte:fragment>
    <pre
      class="text-2xl font-mono text-gray-700"><code>{code1}{#if added}<span in:scale={{ easing: backOut, duration: 300 }} class="inline-block text-green-900 bg-green-100 font-bold">{addition}</span>{/if}{code2}</code></pre>
  </CodeFile>
</div>
