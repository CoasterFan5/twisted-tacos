import { Vector3 } from 'three';

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
