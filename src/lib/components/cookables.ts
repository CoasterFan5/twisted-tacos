import type { Carryable } from '$lib/types/Carryable';

export const cookables: Partial<
	Record<
		Carryable,
		{
			cookTime: number;
			result: Carryable;
		}
	>
> = {
	meat: {
		cookTime: 10_000,
		result: 'cookedMeat'
	},
	cookedMeat: {
		cookTime: 5_000,
		result: 'burntMeat'
	}
};
