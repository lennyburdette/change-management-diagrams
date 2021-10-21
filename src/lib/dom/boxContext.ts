import type { ConnectorConfig, ConnectorDef, WrapperConfig, WrapperDef } from '$lib/types';
import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

const contextKey = 'BOXES';
const resizeContext = Symbol('wtf is this for');

export function initBoxes(): void {
  setContext(contextKey, writable(new Map()));
  setContext(resizeContext, writable(0));
}

export function getBoxes(): Writable<Map<string, HTMLElement>> {
  return getContext(contextKey);
}

export function registerBox(
  element: HTMLElement,
  { id, boxes }: { id: string; boxes: Writable<Map<string, HTMLElement>> }
): unknown {
  boxes.update((map) => map.set(id, element));
  return {
    destroy() {
      boxes.update((map) => {
        map.delete(id);
        return map;
      });
    }
  };
}

export function relativeBoxBounds(boxes: Map<string, HTMLElement>): Map<string, DOMRect> {
  const parent = boxes.get('parent');
  if (!parent) return new Map();

  const pb = parent.getBoundingClientRect();

  const entries: [string, DOMRect][] = [['parent', pb]];

  for (const [id, el] of boxes) {
    if (id === 'parent') continue;
    entries.push([id, fixBox(el.getBoundingClientRect(), pb)]);
  }

  return new Map(entries);
}

export function createConnectors(
  configs: ConnectorConfig[],
  boxes: Map<string, DOMRect>
): ConnectorDef[] {
  const parent = boxes.get('parent');
  if (!parent) return [];

  return configs
    .map((c) => {
      const from = boxes.get(c.from);
      const to = boxes.get(c.to);

      if (!from || !to) return null;

      return { ...c, from, to };
    })
    .filter(Boolean);
}

export function createWrappers(
  configs: WrapperConfig[],
  boxes: Map<string, DOMRect>
): WrapperDef[] {
  return configs.map((c) => {
    const contained: DOMRect[] = c.contain.map((id) => boxes.get(id)).filter(Boolean);

    const x = Math.min(...contained.map((r) => r.x));
    const r = Math.max(...contained.map((r) => r.right));
    const y = Math.min(...contained.map((r) => r.y));
    const b = Math.max(...contained.map((r) => r.bottom));
    return {
      x: Math.round(x - c.p),
      y: Math.round(y - (c.pt ?? c.p)),
      width: Math.round(r - x + c.p * 2),
      height: Math.round(b - y + c.p + (c.pt ?? c.p))
    };
  });
}

function fixBox(child: DOMRect, parent: DOMRect): DOMRect {
  return {
    x: child.x - parent.x,
    y: child.y - parent.y,
    width: child.width,
    height: child.height,
    right: child.right - parent.x,
    bottom: child.bottom - parent.y,
    left: child.left - parent.left,
    top: child.top - parent.top,
    toJSON: () => ({})
  };
}
