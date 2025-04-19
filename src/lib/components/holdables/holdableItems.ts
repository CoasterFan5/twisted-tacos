import type { Carryable } from '$lib/types/Carryable';
import type { Component } from 'svelte';
import Meat from './Meat.svelte';
import Plate from './Plate.svelte';
import CookedMeat from './CookedMeat.svelte';
import BurntMeat from './BurntMeat.svelte';
import Tomato from './Tomato.svelte';
import SlicedTomato from './SlicedTomato.svelte';

export const holdableModels: Partial<Record<Carryable, Component>> = {
	meat: Meat,
	plate: Plate,
	cookedMeat: CookedMeat,
	burntMeat: BurntMeat,
	tomato: Tomato,
	slicedTomato: SlicedTomato
};
