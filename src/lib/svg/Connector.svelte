<script lang="ts">
  import { getState } from '../dom/state';

  export let from: DOMRect;
  export let fromAnchor: 'T' | 'R' | 'L' | 'B' = 'R';
  export let to: DOMRect;
  export let toAnchor: 'T' | 'R' | 'L' | 'B' = 'L';
  export let hidden: boolean = false;

  export let id: string;
  export let after: string | undefined = undefined;

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
        return from.y + from.height;
    }
  })();
  $: x2 = (() => {
    switch (toAnchor) {
      case 'T':
      case 'B':
        return to.x + to.width / 2;
      case 'R':
        return to.x + to.width;
      case 'L':
        return to.x;
    }
  })();
  $: y2 = (() => {
    switch (toAnchor) {
      case 'R':
      case 'L':
        return to.y + to.height / 2;
      case 'T':
        return to.y;
      case 'B':
        return to.y + to.height;
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

  $: d = `M ${x1},${y1} L ${l1x},${l1y} L ${l2x},${l2y} ${x2},${y2}`;
  $: dAnimate = `M ${ax1},${ay1} L ${l1x},${l1y} L ${l2x},${l2y} ${ax2},${ay2}`;

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

  $: running = $state.type === 'DEFAULT';
  $: broken = $state.type === 'BROKEN';
</script>

<g opacity={visible ? 1 : 0} class:text-purple-800={$state.type === 'ACTIVE'}>
  <path
    {d}
    stroke="currentColor"
    stroke-width={$state.type === 'ACTIVE' ? 2 : 1}
    stroke-dasharray="2"
    fill="transparent"
    marker-end={`url(#triangle-${arrowDir})`}
  />

  {#if broken}
    <text x={x1 + (x2 - x1) / 2} y={y1 + (y2 - y1) / 2} text-anchor="middle">❌</text>
  {/if}

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
  {/if}
</g>
