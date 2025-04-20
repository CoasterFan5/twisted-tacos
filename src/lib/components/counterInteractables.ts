import type { Carryable } from '$lib/types/Carryable';

/*
Defines what can be interacted with on a counter
*/
export const counterInteractables: Partial<
	Record<
		Carryable,
		{
			interactTime: number;
			result: Carryable;
		}
	>
> = {
	tomato: {
		interactTime: 2_000,
		result: 'slicedTomato'
	},
	lettuce: {
		interactTime: 2_000,
		result: 'lettuceSlice'
	}
};
