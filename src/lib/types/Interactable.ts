export const interactable = ['fridge', 'stove', 'air'] as const;
export type Interactable = (typeof interactable)[number];
