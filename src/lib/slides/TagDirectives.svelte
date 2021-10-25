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
  variation: Variation`;

  const addition = ` @tag(name: "beta")
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

<div class="absolute inset-0 flex flex-col bg-gray-50">
  <div class="flex-grow" />
  <div class="mx-auto">
    <CodeFile>
      <span slot="title" class="inline-block w-[640px]">Products subgraph</span>
      <pre
        class="text-2xl font-mono text-gray-700"><code>{code1}{#if added}<span in:scale={{ easing: backOut, duration: 300 }} class="inline-block font-bold bg-green-100 text-green-900">{addition}</span>{/if}{code2}</code></pre>
    </CodeFile>
  </div>
  <div class="flex-grow" />
</div>
