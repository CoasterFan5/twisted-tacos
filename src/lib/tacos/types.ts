import type { Ingredient } from '$lib/types/Carryable';

export type Taco = Partial<Record<Ingredient, boolean>>;
