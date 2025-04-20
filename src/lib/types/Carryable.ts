export const carryable = [
	'meat',
	'plate',
	'air',
	'cookedMeat',
	'burntMeat',
	'tomato',
	'slicedTomato',
	'lettuce',
	'lettuceSlice'
] as const;
export type Carryable = (typeof carryable)[number];
