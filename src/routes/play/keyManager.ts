import { playerPos } from './sharedState.svelte';

const activeKeys: { [key: string]: boolean } = {};
const playerSpeed = 3; // m/s

export const registerActiveKey = (e: KeyboardEvent) => {
	activeKeys[e.key] = true;
};

export const removeActiveKey = (e: KeyboardEvent) => {
	delete activeKeys[e.key];
};

export const keyTick = (secondsElpased: number) => {
	for (const k in activeKeys) {
		if (keyEvents[k]) {
			keyEvents[k](secondsElpased);
		}
	}
};

const keyEvents: {
	[key: KeyboardEvent['key']]: (deltaTime: number) => void;
} = {
	w: (ts) => {
		playerPos.x += playerSpeed * ts;
	},
	s: (ts) => {
		playerPos.x -= playerSpeed * ts;
	},
	a: (ts) => {
		playerPos.z -= playerSpeed * ts;
	},
	d: (ts) => {
		playerPos.z += playerSpeed * ts;
	}
};
