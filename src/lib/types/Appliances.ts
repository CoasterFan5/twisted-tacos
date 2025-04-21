import type { Vector2 } from 'three';
import type { CarryableData } from './Carryable';

export const applianceNames = [
	'fridge',
	'stove',
	'counter',
	'trashCan',
	'tomatoes',
	'plateDispenser',
	'spinner',
	'foodDelivery'
] as const;
export type ApplianceName = (typeof applianceNames)[number];

export type ApplianceData = {
	type: ApplianceName;
	position: Vector2;
	constantInventory: boolean;
	holding: CarryableData;
	stock: number; // can specify if an apliance has limited stock
};
