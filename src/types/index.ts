export type SimulationState = 
  | 'idle' | 'capture' | 'transferToPhone' | 'inference' 
  | 'extraction' | 'capsule' | 'trust' | 'planning' 
  | 'transferToPC' | 'execution' | 'verification' | 'complete';

export type CameraPreset = 'hero' | 'phone' | 'npu' | 'capsule' | 'trust' | 'laptop' | 'overview';

export interface TelemetryData {
  npuUtilization: number;
  inferenceLatency: number;
  contextLength: number;
  memoryUsage: number;
  thermalState: 'nominal' | 'warm' | 'throttling';
  tokensProcessed: number;
}

export interface ContextCapsuleData {
  intent: string;
  priority: string;
  component: string;
  environment: string;
  version: string;
  error: string;
  confidence: number;
}

export interface TrustCheck {
  id?: string;
  name?: string;
  label?: string;
  status: 'pending' | 'checking' | 'pass' | 'fail';
  value?: string;
  result?: string;
}

export interface ActionStep {
  id?: string;
  action: string;
  target?: string;
  status: 'pending' | 'active' | 'complete';
}

export type TrustPolicy = 'auto' | 'assisted' | 'confirm' | 'blocked';

export interface Destination {
  id: string;
  name: string;
  icon: string;
  action: string;
  description: string;
}

export interface SemanticNode {
  id: string;
  label: string;
  type: 'entity' | 'attribute' | 'value' | 'intent';
  x?: number;
  y?: number;
}

export interface SemanticEdge {
  from?: string;
  to?: string;
  source?: string;
  target?: string;
  label?: string;
}

export interface VerificationCheck {
  id?: string;
  label: string;
  status: 'pending' | 'checking' | 'verified' | 'failed';
  expected?: string;
  actual?: string;
}
