import { Vector2, Vector3 } from 'three';
import type { CarryableData } from '$lib/types/Carryable';
import { applianceBuilder } from '$lib/components/appliances/applianceBuilder';
import type { ApplianceData } from '$lib/types/Appliances';
import { holdableBuilder } from './components/holdables/holdableBuilder';
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

type Id = string;

export const kitchenItems: Record<Id, ApplianceData> = $state({
	a: applianceBuilder.counter({
		position: new Vector2(4, 4),
		holding: holdableBuilder('tacoShell')
	}),
	b: applianceBuilder.counter({
		position: new Vector2(4, 3),
		holding: holdableBuilder('tacoShell')
	}),
	c: applianceBuilder.counter({
		position: new Vector2(4, 2),
		holding: holdableBuilder('air')
	}),
	d: applianceBuilder.counter({
		position: new Vector2(4, 1),
		holding: holdableBuilder('air')
	}),
	e: applianceBuilder.stove({
		position: new Vector2(4, 0)
	}),
	f: applianceBuilder.counter({
		position: new Vector2(4, -1),
		holding: holdableBuilder('air')
	}),
	g: applianceBuilder.trashCan({
		position: new Vector2(4, -2)
	}),
	h: applianceBuilder.plateDispenser({
		position: new Vector2(4, -3),
		stock: 5
	}),

	j: applianceBuilder.spinner({
		position: new Vector2(0, -4)
	})
});

export const playerData: {
	carrying: CarryableData;
} = $state({
	carrying: holdableBuilder('air')
});
