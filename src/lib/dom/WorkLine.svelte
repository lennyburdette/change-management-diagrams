<script lang="ts">
  import { fly } from 'svelte/transition';
  export let big = false;
</script>

<span
  class="absolute inset-0 grid place-content-center"
  class:text-2xl={big}
  in:fly|local={{ y: -30, duration: 200 }}
  out:fly|local={{ y: 30, duration: 200 }}><slot /></span
>
