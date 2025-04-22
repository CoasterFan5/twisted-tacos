import type { Carryable } from '$lib/types/Carryable';
import type { Component } from 'svelte';
import Meat from './Meat.svelte';
import Plate from './Plate.svelte';
import CookedMeat from './CookedMeat.svelte';
import BurntMeat from './BurntMeat.svelte';
import Tomato from './Tomato.svelte';
import SlicedTomato from './SlicedTomato.svelte';
import Lettuce from './Lettuce.svelte';
import LettuceSlice from './LettuceSlice.svelte';
import TacoShell from './TacoShell.svelte';
import Cheese from './Cheese.svelte';
import CutCheese from './CutCheese.svelte';
import Onion from './Onion.svelte';
import CutOnion from './CutOnion.svelte';

export const holdableModels: Partial<Record<Carryable, Component>> = {
	meat: Meat,
	plate: Plate,
	cookedMeat: CookedMeat,
	burntMeat: BurntMeat,
	tomato: Tomato,
	slicedTomato: SlicedTomato,
	lettuce: Lettuce,
	lettuceSlice: LettuceSlice,
	tacoShell: TacoShell,
	cheese: Cheese,
	cutCheese: CutCheese,
	onion: Onion,
	cutOnion: CutOnion
};

type AllowCarry = Partial<Record<Carryable, boolean>>;

export const allowedChildren: Partial<Record<Carryable, AllowCarry>> = {
	plate: {
		tacoShell: true
	},
	tacoShell: {
		lettuceSlice: true,
		slicedTomato: true,
		cheese: true,
		cookedMeat: true,
		cutCheese: true,
		cutOnion: true
	}
};
