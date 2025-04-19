export const carryable = [
	'meat',
	'plate',
	'air',
	'cookedMeat',
	'burntMeat',
	'tomato',
	'slicedTomato'
] as const;
export type Carryable = (typeof carryable)[number];
