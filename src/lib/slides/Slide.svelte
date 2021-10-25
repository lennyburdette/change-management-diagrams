<script lang="ts">
  import { getState } from '$lib/dom/state';
  import { fly } from 'svelte/transition';
  import AddDeprecation from './AddDeprecation.svelte';
  import Agenda from './Agenda.svelte';
  import BackwardCompatible from './BackwardCompatible.svelte';
  import BackwardCompatibleCode from './BackwardCompatibleCode.svelte';
  import BackwardIncompatible from './BackwardIncompatible.svelte';
  import BackwardIncompatibleCode from './BackwardIncompatibleCode.svelte';
  import FieldUsage from './FieldUsage.svelte';
  import Intro from './Intro.svelte';
  import KeyTakeawayBullets from './KeyTakeawayBullets.svelte';
  import KeyTakeaways from './KeyTakeaways.svelte';
  import MultipleSubgraphs from './MultipleSubgraphs.svelte';
  import OverrideUi from './OverrideUI.svelte';
  import ProductsRemove from './ProductsRemove.svelte';
  import RemoveTags from './RemoveTags.svelte';
  import ReviewsAdd from './ReviewsAdd.svelte';
  import Rollbacks from './Rollbacks.svelte';
  import StagedReleases from './StagedReleases.svelte';
  import Success from './Success.svelte';
  import TagDirectives from './TagDirectives.svelte';
  import Todo from './Todo.svelte';

  const state = getState('slide');
  $: visible = $state.type === 'ACTIVE';

  $: id = $state.type === 'ACTIVE' ? $state.id : null;
  $: component = (() => {
    switch (id) {
      case 'INTRO':
        return Intro;
      case 'AGENDA':
        return Agenda;
      case 'BACKWARD_COMPATIBLE':
        return BackwardCompatible;
      case 'BACKWARD_COMPATIBLE_CODE':
        return BackwardCompatibleCode;
      case 'SUCCESS':
        return Success;
      case 'BACKWARD_INCOMPATIBLE':
        return BackwardIncompatible;
      case 'BACKWARD_INCOMPATIBLE_CODE':
        return BackwardIncompatibleCode;
      case 'ADD_DEPRECATION':
        return AddDeprecation;
      case 'FIELD_USAGE':
        return FieldUsage;
      case 'OVERRIDE_UI':
        return OverrideUi;
      case 'ROLLBACKS':
        return Rollbacks;
      case 'STAGED_RELEASES':
        return StagedReleases;
      case 'TAG_DIRECTIVES':
        return TagDirectives;
      case 'REMOVE_TAGS':
        return RemoveTags;
      case 'MULTIPLE_SUBGRAPHS':
        return MultipleSubgraphs;
      case 'REVIEWS_ADD':
        return ReviewsAdd;
      case 'PRODUCTS_REMOVE':
        return ProductsRemove;
      case 'KEY_TAKEAWAYS':
        return KeyTakeaways;
      case 'KEY_TAKEAWAY_BULLETS':
        return KeyTakeawayBullets;
      default:
        return Todo;
    }
  })();
</script>

{#if visible}
  <div in:fly class="fixed inset-0 bg-white grid place-content-center z-40">
    <svelte:component this={component} {id} />
  </div>
{/if}
