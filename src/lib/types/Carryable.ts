export const ingredients = ['cookedMeat', 'slicedTomato', 'lettuceSlice'] as const;
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
