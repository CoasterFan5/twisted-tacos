import { newSpeed } from './sharedState.svelte';

const activeKeys: { [key: string]: boolean } = {};
const speedFactor = 10;

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
		newSpeed.x += speedFactor * ts;
	},
	s: (ts) => {
		newSpeed.x -= speedFactor * ts;
	},
	a: (ts) => {
		newSpeed.z -= speedFactor * ts;
	},
	d: (ts) => {
		newSpeed.z += speedFactor * ts;
	}
};
