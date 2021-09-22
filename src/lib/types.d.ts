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
  | { type: 'ACTIVE' }
  | { type: 'COMPLETE' }
  | { type: 'SCHEMA'; schema: string; active: boolean }
  | { type: 'ROLLING_DEPLOY'; schema: string; code: number }
  | { type: 'DEPLOY'; schema: string; code: number }
  | { type: 'BROKEN' }
  | { type: 'SHOW' }
  | { type: 'HIDE' };

export interface Step {
  title: string;
  description?: string;
  states: { [key: string]: State };
}

export interface Script {
  steps: Step[];
  tasks: Task[][];
  lines: ConnectorConfig[];
  boxes: WrapperConfig[];
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
