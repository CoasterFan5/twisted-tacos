import type { Carryable, CarryableData } from '$lib/types/Carryable';
import { holdableBuilder } from './holdables/holdableBuilder';

/*
Defines what can be interacted with on a counter
*/
export const counterInteractables: Partial<
	Record<
		Carryable,
		{
			interactTime: number;
			result: CarryableData;
		}
	>
> = {
	tomato: {
		interactTime: 2_000,
		result: holdableBuilder('slicedTomato')
	},
	lettuce: {
		interactTime: 2_000,
		result: holdableBuilder('lettuceSlice')
	},
	cheese: {
		interactTime: 1_500,
		result: holdableBuilder('cutCheese')
	},
	onion: {
		interactTime: 1_500,
		result: holdableBuilder('cutOnion')
	}
};
