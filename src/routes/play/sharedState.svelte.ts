import { Vector2, Vector3 } from 'three';
import type { Carryable } from '$lib/types/Carryable';
import type { Interactable } from '$lib/types/Interactable';
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

type GenericInteractable = {
	position: Vector2;
};

type GenericInteractableWithInventory = {
	holding: Carryable;
} & GenericInteractable;

type FridgeData = {} & GenericInteractableWithInventory;

type CounterData = {} & GenericInteractableWithInventory;

type StovesData = {} & GenericInteractableWithInventory;

type TrashCansData = {} & GenericInteractable;

type PlateDispenser = {} & GenericInteractable;

type PlateData = {
	holding: Partial<Record<Carryable, boolean>>;
};

type Id = string;

export const kitchen: {
	fridges: Record<Id, FridgeData>;
	counters: Record<Id, CounterData>;
	stoves: Record<Id, StovesData>;
	trashCans: Record<Id, TrashCansData>;
	tomatoes: Record<Id, GenericInteractable>;
	plateDispensers: Record<Id, GenericInteractable>;
} = $state({
	fridges: {
		fA: { holding: 'meat', position: new Vector2(4, 4) }
	},
	counters: {
		cA: {
			holding: 'lettuce',
			position: new Vector2(4, 3)
		},
		cB: {
			holding: 'air',
			position: new Vector2(4, 2)
		},
		cC: {
			holding: 'plate',
			position: new Vector2(4, 1)
		}
	},
	stoves: {
		sA: {
			holding: 'air',
			position: new Vector2(4, 0)
		}
	},
	trashCans: {
		tA: {
			holding: 'air',
			position: new Vector2(4, -1)
		}
	},
	tomatoes: {
		toA: {
			holding: 'tomato',
			position: new Vector2(4, -2)
		}
	},
	plateDispensers: {
		pA: {
			position: new Vector2(4, -3)
		}
	},
	plates: {}
});

export const playerData: {
	carrying: Carryable;
	interactableType: Interactable;
} = $state({
	carrying: 'air',
	interactableType: 'air'
});
