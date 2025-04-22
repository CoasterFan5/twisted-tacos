import type { Taco } from './types';

const randomBool = () => {
	return Math.random() > 0.5;
};

export const getRandomTacoOrder: () => Taco = () => {
	return {
		cookedMeat: true,
		lettuceSlice: randomBool(),
		slicedTomato: randomBool(),
		cutCheese: randomBool(),
		cutOnion: randomBool()
	};
};
