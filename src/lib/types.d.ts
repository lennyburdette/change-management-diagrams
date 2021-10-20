/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals {
  userid: string;
}

export interface Task {
  id: string;
  label: string;
}

type State =
  | { type: 'DEFAULT' }
  | { type: 'ACTIVE'; work?: string; id?: string }
  | { type: 'COMPLETE'; highlight?: boolean }
  | { type: 'SCHEMA'; schema: string; active: boolean }
  | { type: 'ROLLING_DEPLOY'; servers: { code: number; schema: string }[] }
  | { type: 'DEPLOY'; schema: string; code: number }
  | { type: 'BROKEN' }
  | { type: 'SHOW' }
  | { type: 'HIDE' }
  // studio
  | { type: 'CHECK_PASS' }
  | { type: 'CHECK_COMPOSITION_FAIL' }
  | { type: 'CHECK_OPERATIONS_FAIL' }
  | { type: 'COMPOSE_PASS' }
  | { type: 'COMPOSE_FAIL' }
  | { type: 'COMPOSE_CONTRACT' };

export interface Step {
  title: string;
  description?: string;
  states: { [key: string]: State };
  duration?: number;
}

export interface Script {
  steps: Step[];
  tasks: Task[][];
  tasks2?: Task[][];
  lines: ConnectorConfig[];
  boxes: WrapperConfig[];
  slides?: { [key: string]: State }[];
}

export interface ConnectorConfig {
  id: string;
  from: string;
  to: string;
  after?: string;
  fromAnchor?: 'T' | 'R' | 'L' | 'B';
  toAnchor?: 'T' | 'R' | 'L' | 'B';
  hidden?: boolean;
}

export interface ConnectorDef {
  id: string;
  from: DOMRect;
  to: DOMRect;
  after?: string;
}

export interface WrapperConfig {
  contain: string[];
  p: number;
  pt?: number;
}

export interface WrapperDef {
  x: number;
  y: number;
  width: number;
  height: number;
}
