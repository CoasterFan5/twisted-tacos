import type { Carryable, CarryableData } from '$lib/types/Carryable';
import { holdableBuilder } from './holdables/holdableBuilder';

export const cookables: Partial<
	Record<
		Carryable,
		{
			cookTime: number;
			result: CarryableData;
		}
	>
> = {
	meat: {
		cookTime: 10_000,
		result: holdableBuilder('cookedMeat')
	},
	cookedMeat: {
		cookTime: 5_000,
		result: holdableBuilder('burntMeat')
	}
};
