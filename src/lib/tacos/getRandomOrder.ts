import type { Taco } from './types';

const randomBool = () => {
	return Math.random() > 0.5;
};

export const getRandomTacoOrders: () => Taco = () => {
	return {
		cookedMeat: true,
		lettuceSlice: randomBool(),
		slicedTomato: randomBool()
	};
};
