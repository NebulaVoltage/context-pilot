import { ContextCapsuleData, SemanticNode, SemanticEdge, TrustCheck, ActionStep, Destination, VerificationCheck, TelemetryData } from '@/types';

export const INCIDENT_TEXT = 'Production users are receiving AUTH-502 after deployment 8.2. Login succeeds intermittently and several customers are blocked.';

export const SEMANTIC_NODES: SemanticNode[] = [
  { id: 'n1', label: 'Bug', type: 'entity', x: 0, y: 0 },
  { id: 'n2', label: 'Authentication', type: 'attribute', x: -100, y: -50 },
  { id: 'n3', label: 'Production', type: 'value', x: 100, y: -50 },
  { id: 'n4', label: 'Version 8.2', type: 'value', x: 0, y: -100 },
  { id: 'n5', label: 'AUTH-502', type: 'value', x: -100, y: 50 },
  { id: 'n6', label: 'Login Failure', type: 'attribute', x: 100, y: 50 }
];

export const SEMANTIC_EDGES: SemanticEdge[] = [
  { from: 'n1', to: 'n2', label: 'component' },
  { from: 'n1', to: 'n3', label: 'environment' },
  { from: 'n1', to: 'n4', label: 'version' },
  { from: 'n2', to: 'n5', label: 'error code' },
  { from: 'n1', to: 'n6', label: 'symptom' }
];

export const CONTEXT_CAPSULE: ContextCapsuleData = {
  intent: 'File Bug Report',
  priority: 'P1',
  component: 'Authentication',
  environment: 'Production',
  version: '8.2',
  error: 'AUTH-502',
  confidence: 0.942
};

export const TRUST_CHECKS: TrustCheck[] = [
  { name: 'Privacy', status: 'pass', value: 'No PII detected' },
  { name: 'Schema', status: 'pass', value: 'Valid capsule format' },
  { name: 'Confidence', status: 'pass', value: '94.2% (> 90%)' },
  { name: 'Risk', status: 'pass', value: 'Low risk action' },
  { name: 'Policy', status: 'pass', value: 'Auto-approved' }
];

export const ACTION_STEPS: ActionStep[] = [
  { action: 'Create Issue', status: 'complete' },
  { action: 'Set Priority P1', status: 'complete' },
  { action: 'Set Component Authentication', status: 'complete' },
  { action: 'Add Environment Production', status: 'complete' },
  { action: 'Add Error Code AUTH-502', status: 'active' }
];

export const DESTINATIONS: Destination[] = [
  { id: 'jira', name: 'Jira', icon: 'jira', action: 'Create Ticket', description: 'Atlassian Jira Software' },
  { id: 'linear', name: 'Linear', icon: 'linear', action: 'Create Issue', description: 'Linear App' },
  { id: 'notion', name: 'Notion', icon: 'notion', action: 'Create Page', description: 'Notion Workspace' },
  { id: 'servicenow', name: 'ServiceNow', icon: 'servicenow', action: 'Create Incident', description: 'ITSM Platform' },
  { id: 'slack', name: 'Slack', icon: 'slack', action: 'Post Message', description: 'Team Communication' },
  { id: 'gmail', name: 'Gmail', icon: 'gmail', action: 'Draft Email', description: 'Google Mail' },
  { id: 'crm', name: 'Salesforce', icon: 'crm', action: 'Update Record', description: 'Customer Relationship Management' }
];

export const TELEMETRY_TIMELINE: Record<string, TelemetryData> = {
  idle: { npuUtilization: 0, inferenceLatency: 0, contextLength: 0, memoryUsage: 120, thermalState: 'nominal', tokensProcessed: 0 },
  capture: { npuUtilization: 5, inferenceLatency: 0, contextLength: 24, memoryUsage: 125, thermalState: 'nominal', tokensProcessed: 0 },
  transferToPhone: { npuUtilization: 10, inferenceLatency: 0, contextLength: 24, memoryUsage: 130, thermalState: 'nominal', tokensProcessed: 0 },
  inference: { npuUtilization: 85, inferenceLatency: 12, contextLength: 24, memoryUsage: 450, thermalState: 'warm', tokensProcessed: 48 },
  extraction: { npuUtilization: 92, inferenceLatency: 15, contextLength: 48, memoryUsage: 512, thermalState: 'warm', tokensProcessed: 128 },
  capsule: { npuUtilization: 30, inferenceLatency: 0, contextLength: 48, memoryUsage: 256, thermalState: 'nominal', tokensProcessed: 128 },
  trust: { npuUtilization: 15, inferenceLatency: 0, contextLength: 48, memoryUsage: 260, thermalState: 'nominal', tokensProcessed: 128 },
  planning: { npuUtilization: 45, inferenceLatency: 8, contextLength: 64, memoryUsage: 310, thermalState: 'nominal', tokensProcessed: 156 },
  transferToPC: { npuUtilization: 10, inferenceLatency: 0, contextLength: 64, memoryUsage: 180, thermalState: 'nominal', tokensProcessed: 156 },
  execution: { npuUtilization: 5, inferenceLatency: 0, contextLength: 64, memoryUsage: 185, thermalState: 'nominal', tokensProcessed: 156 },
  verification: { npuUtilization: 20, inferenceLatency: 5, contextLength: 64, memoryUsage: 200, thermalState: 'nominal', tokensProcessed: 172 },
  complete: { npuUtilization: 0, inferenceLatency: 0, contextLength: 0, memoryUsage: 120, thermalState: 'nominal', tokensProcessed: 172 }
};

export const VERIFICATION_CHECKS: VerificationCheck[] = [
  { label: 'Issue Created', status: 'verified' },
  { label: 'Fields Populated', status: 'verified' },
  { label: 'Links Attached', status: 'verified' },
  { label: 'Notifications Sent', status: 'pending' }
];

export const DEMO_METRICS = { 
  appSwitchesAvoided: 3, 
  manualFieldsEliminated: 7, 
  aiConfidence: 94.2, 
  inference: 'LOCAL', 
  cloudRequests: 0, 
  workflowLatency: '1.8s' 
};
