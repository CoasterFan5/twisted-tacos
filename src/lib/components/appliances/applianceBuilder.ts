import type { ApplianceData, ApplianceName } from '$lib/types/Appliances';
import type { Carryable } from '$lib/types/Carryable';
import { Vector2 } from 'three';

/* eslint-disable @typescript-eslint/no-explicit-any */
// Define separate argument type records
type ApplianceArgTypes = {
	fridge: { item: Carryable; position: Vector2 };
	stove: { position: Vector2 };
	counter: { position: Vector2 };
	trashCan: { position: Vector2 };
	tomatoes: { position: Vector2 };
	plateDispenser: { position: Vector2; stock: number };
	// Define argument types for other appliances here
	// oven: { capacity: number; position: Vector2 };
	// sink: { waterSource: string; position: Vector2 };
};

// Define the builder function type using generics and the ArgTypes record
type ApplianceBuilderFunction<T extends ApplianceName> = T extends keyof ApplianceArgTypes
	? (args: ApplianceArgTypes[T]) => ApplianceData
	: (args: Record<string, any>) => ApplianceData; // Fallback

// Define the structure for our appliance builders
type ApplianceBuilders = {
	[K in ApplianceName]: ApplianceBuilderFunction<K>;
};

export const applianceBuilder: ApplianceBuilders = {
	fridge: (args: ApplianceArgTypes['fridge']) => {
		return {
			type: 'fridge',
			position: args.position,
			constantInventory: true,
			holding: args.item,
			stock: -1
		};
	},
	stove: (args: ApplianceArgTypes['stove']) => {
		return {
			type: 'stove',
			position: args.position,
			holding: 'air',
			constantInventory: false,
			stock: -1
		};
	},
	counter: (args: ApplianceArgTypes['counter']) => {
		return {
			type: 'counter',
			position: args.position,
			holding: 'air',
			constantInventory: false,
			stock: -1
		};
	},
	trashCan: (args: ApplianceArgTypes['trashCan']) => {
		return {
			type: 'trashCan',
			position: args.position,
			holding: 'air',
			constantInventory: true,
			stock: -1
		};
	},
	tomatoes: (args: ApplianceArgTypes['tomatoes']) => {
		return {
			type: 'tomatoes',
			position: args.position,
			holding: 'tomato',
			constantInventory: true,
			stock: -1
		};
	},
	plateDispenser: (args: ApplianceArgTypes['plateDispenser']) => {
		return {
			type: 'plateDispenser',
			position: args.position,
			holding: 'plate',
			constantInventory: true,
			stock: args.stock
		};
	}

	// Add new appliance builders here, referencing the ArgTypes
	// oven: (args: ApplianceArgTypes['oven']) => ({ type: 'oven', capacity: args.capacity, position: args.position }),
	// sink: (args: ApplianceArgTypes['sink']) => ({ type: 'sink', waterSource: args.waterSource, position: args.position }),
} as ApplianceBuilders;
