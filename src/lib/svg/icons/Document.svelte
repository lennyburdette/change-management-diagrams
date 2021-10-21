<script lang="ts">
  export let version: string;

  const narrow =
    'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z';
  const wide =
    'M 5.76 21 L 19.065 21 C 20.534 21 21.725 20.105 21.725 19 L 21.725 9.414 C 21.725 9.149 21.584 8.894 21.336 8.707 L 14.133 3.293 C 13.883 3.105 13.545 3 13.193 3 L 5.76 3 C 4.291 3 3.1 3.895 3.1 5 L 3.1 19 C 3.1 20.105 4.291 21 5.76 21 Z';
  /* version?.length > 1 ? wide : narrow */
</script>

<div class="grid place-content-center">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-10 w-10"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d={narrow} />
  </svg>
  <div class="absolute inset-0 grid place-content-center">
    <span class="relative top-[1px]">{version}</span>
  </div>
</div>
