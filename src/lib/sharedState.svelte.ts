import { Vector2, Vector3 } from 'three';
import type { Carryable } from '$lib/types/Carryable';
import type { Interactable } from '$lib/types/Interactable';
import { applianceBuilder } from '$lib/components/appliances/applianceBuilder';
import type { ApplianceData } from '$lib/types/Appliances';
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

type CounterData = {} & GenericInteractableWithInventory;

type StovesData = {} & GenericInteractableWithInventory;

type TrashCansData = {} & GenericInteractable;

type PlateDispenser = {} & GenericInteractable;

type PlateData = {
	holding: Partial<Record<Carryable, boolean>>;
};

type Id = string;

export const kitchenItems: Record<Id, ApplianceData> = $state({
	a: applianceBuilder.fridge({
		position: new Vector2(4, 4),
		item: 'meat'
	}),
	b: applianceBuilder.counter({
		position: new Vector2(4, 3)
	}),
	c: applianceBuilder.counter({
		position: new Vector2(4, 2)
	}),
	d: applianceBuilder.counter({
		position: new Vector2(4, 1)
	}),
	e: applianceBuilder.stove({
		position: new Vector2(4, 0)
	}),
	f: applianceBuilder.counter({
		position: new Vector2(4, -1)
	}),
	g: applianceBuilder.trashCan({
		position: new Vector2(4, -2)
	}),
	h: applianceBuilder.tomatoes({
		position: new Vector2(4, -3)
	}),
	i: applianceBuilder.plateDispenser({
		position: new Vector2(4, -4),
		stock: 3
	})
});

export const kitchen: {
	counters: Record<Id, CounterData>;
	stoves: Record<Id, StovesData>;
	trashCans: Record<Id, TrashCansData>;
	tomatoes: Record<Id, GenericInteractable>;
	plateDispensers: Record<Id, GenericInteractable>;
} = $state({
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
