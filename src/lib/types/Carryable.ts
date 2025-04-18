export const carryable = ['meat', 'plate', 'air'] as const;
export type Carryable = (typeof carryable)[number];
