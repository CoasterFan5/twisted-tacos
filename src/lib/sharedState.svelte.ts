import { Vector2, Vector3 } from 'three';
import type { CarryableData } from '$lib/types/Carryable';
import { applianceBuilder } from '$lib/components/appliances/applianceBuilder';
import { holdableBuilder } from './components/holdables/holdableBuilder';
import type { Taco } from './tacos/types';
import type { KitchenLayout } from './types/KitchenLayout';
export const cameraPos = $state({
	x: 0,
	y: 0
});

export const playerPos = $state({
	x: 0,
	y: 0,
	z: 0
});

export const playerSpeed = $state(new Vector3(0, 0, 0));
export const newSpeed = $state(new Vector3(0, 0, 0));
export const realPlayerSpeed = $state({
	x: 0,
	y: 0,
	z: 0
});

export const cursorPos = {
	x: 0,
	z: 0
};

export const orders: {
	id: number;
	req: Taco;
}[] = $state([]);

export const kitchenData: {
	data: KitchenLayout;
} = $state({
	data: {}
});

export const tutorialData = $state({
	stage: 0,
	maxAllowedStage: 0
});

export const playerData: {
	carrying: CarryableData;
	balance: number;
	timeInDay: number;
	dayNumber: number;
	animationState: 'idle' | 'walk' | 'interact-left' | 'interact-right' | 'holding-right';
} = $state({
	carrying: holdableBuilder('air'),
	balance: 10,
	timeInDay: 0,
	dayNumber: 1,
	animationState: 'idle'
});
