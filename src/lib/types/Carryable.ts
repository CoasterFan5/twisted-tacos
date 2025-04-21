export const ingredients = ['cookedMeat', 'slicedTomato', 'lettuceSlice', 'tacoShell'] as const;
export const carryable = [
	'meat',
	'plate',
	'air',
	'burntMeat',
	'tomato',
	'lettuce',
	...ingredients
] as const;

export type Ingredient = (typeof ingredients)[number];
export type Carryable = (typeof carryable)[number];

export type CarryableData = {
	type: Carryable;
	children: Partial<Record<Carryable, CarryableData>>;
};
