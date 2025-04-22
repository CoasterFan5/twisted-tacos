import { newSpeed, tutorialData } from './sharedState.svelte';

const activeKeys: { [key: string]: boolean } = {};
const speedFactor = 10;

type VoidFunction = () => void;
type InteractionCallback = (ts: number) => void;
const eListeners: Record<
	string,
	{
		callback: VoidFunction;
	}
> = {};

const interactListeners: Record<
	string,
	{
		callback: InteractionCallback;
	}
> = {};

export const registerEListener = (key: string, callback: VoidFunction) => {
	eListeners[key] = {
		callback
	};
};

export const unregisterEListener = (key: string) => {
	delete eListeners[key];
};

export const registerInteractListener = (key: string, callback: InteractionCallback) => {
	interactListeners[key] = {
		callback
	};
};

export const unRegisterInteractListener = (key: string) => {
	delete interactListeners[key];
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
	ArrowRight: (ts) => {
		if (tutorialData.maxAllowedStage > tutorialData.stage) {
			tutorialData.stage = Math.round(tutorialData.stage + 1);
		}
	},
	e: () => {
		for (const i in eListeners) {
			eListeners[i].callback();
		}
	},
	q: (ts) => {
		for (const i in interactListeners) {
			interactListeners[i].callback(ts);
		}
	}
};
