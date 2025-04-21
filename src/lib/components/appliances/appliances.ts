import type { Component } from 'svelte';
import type { ApplianceName } from '$lib/types/Appliances';

import Fridge from './Fridge.svelte';
import Stove from './Stove.svelte';
import Counter from './Counter.svelte';
import TrashCan from './TrashCan.svelte';
import Tomatoes from './Tomatoes.svelte';
import PlateDispenser from './PlateDispenser.svelte';
import Spinner from './Spinner.svelte';
import FoodDelivery from './FoodDelivery.svelte';

export const appliances: Record<ApplianceName, Component> = {
	fridge: Fridge,
	stove: Stove,
	counter: Counter,
	trashCan: TrashCan,
	tomatoes: Tomatoes,
	plateDispenser: PlateDispenser,
	spinner: Spinner,
	foodDelivery: FoodDelivery
};
