import { newSpeed } from './sharedState.svelte';

const activeKeys: { [key: string]: boolean } = {};
const speedFactor = 10;

type VoidFunction = () => void;
const interactListeners: Record<string, VoidFunction> = {};
export const registerInteractListener = (key: string, callback: () => void) => {
	interactListeners[key] = callback;
	console.info(interactListeners);
};

export const unregisterInteractListener = (key: string) => {
	delete interactListeners[key];
	console.info(interactListeners);
};

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
	},
	e: () => {
		for (const i in interactListeners) {
			interactListeners[i]();
		}
	}
};
