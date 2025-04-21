<script lang="ts">
	import { T } from '@threlte/core';
	import TacoShell from './TacoShell.svelte';
	import CookedMeat from './CookedMeat.svelte';
	import type { CarryableData } from '$lib/types/Carryable';
	import SlicedTomato from './SlicedTomato.svelte';

	export const { tacoData }: { tacoData: CarryableData } = $props();
</script>

<T.Group position={[0, 0.02, 0]}>
	<TacoShell />
	{#if tacoData.children.cookedMeat}
		<T.Group position={[0, 0.1, 0]} scale={[0.6, 1, 0.2]}>
			<CookedMeat></CookedMeat>
		</T.Group>
	{/if}
	{#if tacoData.children.slicedTomato}
		<T.Group position={[0.15, 0.17, 0]} scale={[0.4, 0.5, 0.4]} rotation={[0, 0, -Math.PI / 6]}>
			<SlicedTomato></SlicedTomato>
		</T.Group>
	{/if}
</T.Group>
