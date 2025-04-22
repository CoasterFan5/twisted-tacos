import { Vector2, Vector3 } from 'three';
import type { CarryableData } from '$lib/types/Carryable';
import { applianceBuilder } from '$lib/components/appliances/applianceBuilder';
import type { ApplianceData } from '$lib/types/Appliances';
import { holdableBuilder } from './components/holdables/holdableBuilder';
import type { Taco } from './tacos/types';
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

export const orders: {
	id: number;
	req: Taco;
}[] = $state([]);

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
		stock: 10
	}),
	i: applianceBuilder.foodDelivery({
		position: new Vector2(2, -5)
	}),
	j: applianceBuilder.spinner({
		position: new Vector2(0, -5)
	}),
	k: applianceBuilder.spinner({
		position: new Vector2(-2, -5)
	}),
	l: applianceBuilder.spinner({
		position: new Vector2(-4, -5)
	})
});

export const playerData: {
	carrying: CarryableData;
	balance: number;
	timeInDay: number;
	dayNumber: number;
} = $state({
	carrying: holdableBuilder('air'),
	balance: 10,
	timeInDay: 0,
	dayNumber: 1
});
