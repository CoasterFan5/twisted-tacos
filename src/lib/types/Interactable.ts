export const interactable = ['fridge', 'stove'] as const;
export type Interactable = (typeof interactable)[number];
