<script lang="ts">
  import { onMount } from 'svelte';

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let vy = Math.random() * 100 - 50;
  let vx = Math.random() * 100 - 50;

  const gravity = 0.5;
  const friction = 0.975;

  function animate() {
    if (y < window.innerHeight + 10) {
      y += vy;
      x += vx;
      vy *= friction;
      vy += gravity;
      vx *= 0.99;
      requestAnimationFrame(animate);
    }
  }

  onMount(() => {
    requestAnimationFrame(animate);
  });
</script>

<div class="absolute text-6xl" style={`top: ${y}px; left: ${x}px`}>🎉</div>
