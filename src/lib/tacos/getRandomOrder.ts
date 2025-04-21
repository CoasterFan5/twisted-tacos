import type { Taco } from './types';

const randomBool = () => {
	return Math.random() > 0.5;
};

export const getRandomTacoOrder: () => Taco = () => {
	const r: Taco = {};

	r['cookedMeat'] = true;

	if (randomBool()) {
		r['lettuceSlice'] = true;
	}

	if (randomBool()) {
		r['slicedTomato'] = true;
	}

	return r;
};
