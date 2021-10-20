<script lang="ts">
  export let value: number = 0;
</script>

<div class="fixed top-0 left-0 w-full h-[4px] z-50">
  <div class="bg-green-400 h-full transition-all duration-500" style={`width: ${value * 100}%`} />
</div>
