export const carryable = ['meat', 'plate', 'air', 'cookedMeat', 'burntMeat'] as const;
export type Carryable = (typeof carryable)[number];

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
