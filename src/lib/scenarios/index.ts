import BackwardCompatible from '$lib/scenarios/BackwardCompatible.svelte';
import BackwardIncompatible from '$lib/scenarios/BackwardIncompatible.svelte';
import GatewayLogic from '$lib/scenarios/GatewayLogic.svelte';
import DataSource from '$lib/scenarios/DataSource.svelte';

export const scenarios: { slug: string; title: string; component: any }[] = [
  {
    slug: 'backward-compatible',
    title: 'Backward compatible subgraph schema change',
    component: BackwardCompatible
  },
  {
    slug: 'backward-incompatible',
    title: 'Backward incompatible subgraph schema change',
    component: BackwardIncompatible
  },
  {
    slug: 'gateway-logic',
    title: 'Gateway logic changes',
    component: GatewayLogic
  },
  {
    slug: 'data-source',
    title: 'Data source changes (with feature flags)',
    component: DataSource
  }
];
