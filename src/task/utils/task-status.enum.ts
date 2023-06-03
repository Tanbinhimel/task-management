export enum TaskStatus {
  'OPEN' = 'OPEN',
  'IN_PROGRESS' = 'IN_PROGRESS',
  'DONE' = 'DONE',
}

export const allowedTaskStatusArray = Object.values(TaskStatus);
