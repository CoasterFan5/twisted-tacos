export const carryable = ['meat', 'plate', 'air', 'cookedMeat'] as const;
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
		cookTime: 1000,
		result: 'cookedMeat'
	}
};
