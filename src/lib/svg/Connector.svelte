<script lang="ts">
  import { getState } from '../dom/state';

  export let from: DOMRect;
  export let fromAnchor: 'T' | 'R' | 'L' | 'B' = 'R';
  export let to: DOMRect;
  export let toAnchor: 'T' | 'R' | 'L' | 'B' = 'L';
  export let hidden: boolean = false;

  export let id: string;
  // export let after: string | undefined = undefined;

  const state = getState(id);
  $: visible = ['SHOW', 'ACTIVE'].includes($state.type)
    ? true
    : $state.type === 'HIDE'
    ? false
    : !hidden;

  $: x1 = (() => {
    switch (fromAnchor) {
      case 'T':
      case 'B':
        return from.x + from.width / 2;
      case 'R':
        return from.x + from.width;
      case 'L':
        return from.x;
    }
  })();
  $: y1 = (() => {
    switch (fromAnchor) {
      case 'R':
      case 'L':
        return from.y + from.height / 2;
      case 'T':
        return from.y;
      case 'B':
        return from.y + from.height - 10;
    }
  })();
  $: x2 = (() => {
    switch (toAnchor) {
      case 'T':
      case 'B':
        return to.x + to.width / 2;
      case 'R':
        return to.x + to.width + 10;
      case 'L':
        return to.x - 10;
    }
  })();
  $: y2 = (() => {
    switch (toAnchor) {
      case 'R':
      case 'L':
        return to.y + to.height / 2;
      case 'T':
        return to.y - 10;
      case 'B':
        return to.y + to.height + 10;
    }
  })();

  $: ax1 = (() => {
    switch (fromAnchor) {
      case 'T':
      case 'B':
        return x1;
      case 'R':
        return x1 - 10;
      case 'L':
        return x1 + 10;
    }
  })();
  $: ay1 = (() => {
    switch (fromAnchor) {
      case 'R':
      case 'L':
        return y1;
      case 'T':
        return y1 + 10;
      case 'B':
        return y1 - 10;
    }
  })();
  $: ax2 = (() => {
    switch (toAnchor) {
      case 'T':
      case 'B':
        return x2;
      case 'R':
        return x2 - 10;
      case 'L':
        return x2 + 10;
    }
  })();
  $: ay2 = (() => {
    switch (toAnchor) {
      case 'R':
      case 'L':
        return y2;
      case 'T':
        return y2 + 10;
      case 'B':
        return y2 - 10;
    }
  })();

  $: l1x = x1 + (x2 - x1) / 2;
  $: l1y = y1;
  $: l2x = l1x;
  $: l2y = y2;

  // $: d = `M ${x1},${y1} L ${l1x},${l1y} L ${l2x},${l2y} ${x2},${y2}`;
  $: d = [x1, y1, l1x, l1y, x2, x2].every((x) => !!x)
    ? `M ${x1},${y1} S ${l1x},${l1y} ${x2},${y2}`
    : 'M0,0';
  // $: dAnimate = `M ${ax1},${ay1} L ${l1x},${l1y} L ${l2x},${l2y} ${ax2},${ay2}`;

  $: arrowDir = (() => {
    switch (toAnchor) {
      case 'R':
        return 'left';
      case 'L':
        return 'right';
      case 'T':
        return 'down';
      case 'B':
        return 'up';
    }
  })();

  // $: running = false; // $state.type === 'DEFAULT';
  $: broken = $state.type === 'BROKEN';
</script>

<g
  opacity={visible ? 1 : 0}
  class:text-purple-800={$state.type === 'ACTIVE'}
  class:text-gray-200={$state.type === 'DIMMED'}
  class:text-red-600={broken}
>
  <defs>
    <marker
      id="{id}-triangle-right"
      viewBox="0 0 10 10"
      refX="0"
      refY="5"
      markerUnits="userSpaceOnUse"
      markerWidth="9"
      markerHeight="9"
      orient="auto"
    >
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
    </marker>

    <marker
      id="{id}-triangle-down"
      viewBox="0 0 10 10"
      refX="0"
      refY="5"
      markerUnits="userSpaceOnUse"
      markerWidth="9"
      markerHeight="9"
      orient="90"
    >
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
    </marker>

    <marker
      id="{id}-triangle-up"
      viewBox="0 0 10 10"
      refX="0"
      refY="5"
      markerUnits="userSpaceOnUse"
      markerWidth="9"
      markerHeight="9"
      orient="-90"
    >
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
    </marker>
  </defs>

  <path
    {d}
    stroke="currentColor"
    stroke-width={broken ? 4 : $state.type === 'ACTIVE' ? 3 : 2}
    stroke-dasharray={broken ? '3,3' : '0'}
    fill="transparent"
    marker-end={`url(#${id}-triangle-${arrowDir})`}
  />

  <!-- {#if broken}
    <text x={x1 + (x2 - x1) / 2} y={y1 + (y2 - y1) / 2} text-anchor="middle">❌</text>
  {/if} -->
  <!--
  {#if running}
    <circle r="3" fill="currentColor">
      <animateMotion
        id={`${id}anim`}
        dur="2.5s"
        begin={after ? after : '0s'}
        path={dAnimate}
        fill="freeze"
      />
    </circle>
  {/if} -->
</g>
