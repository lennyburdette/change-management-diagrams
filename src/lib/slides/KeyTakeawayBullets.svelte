<script lang="ts">
  export let step: number = 0;
</script>

<div
  class="absolute inset-0 bg-gradient-to-tr from-purple-900 to-blue-300 grid place-content-center"
>
  <div class="mx-28 font-bold text-white">
    <ul class="list-disc text-5xl space-y-8">
      <li class="opacity-0 transition-all" class:opacity-100={step >= 1}>
        Temporary inconsistency isn’t that big of a deal
      </li>
      <li class="opacity-0 transition-all" class:opacity-100={step >= 2}>
        Use the deprecation process and track field usage to safely make breaking changes
      </li>
      <!-- <li class="opacity-0 transition-all" class:opacity-100={step >= 3}>
        Isolate API changes from other kinds of changes
      </li> -->
      <li class="opacity-0 transition-all" class:opacity-100={step >= 3}>
        API “rollbacks” are problematic; release in stages instead
      </li>
      <li class="opacity-0 transition-all" class:opacity-100={step >= 4}>
        Federation 2 will make shared schema changes much easier!
      </li>
    </ul>
  </div>
</div>
