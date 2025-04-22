<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import { holdableModels } from '../holdables/holdableItems';
	import { playerData } from '$lib/sharedState.svelte';
	import type { Carryable } from '$lib/types/Carryable';

	const HeldModel = $derived(holdableModels[playerData.carrying.type]);

	const cleanNames: Record<Carryable, string> = {
		meat: 'Meat',
		plate: 'Plate',
		air: 'Nothing',
		burntMeat: 'Burnt Meat',
		tomato: 'Tomato',
		slicedTomato: 'Cut Tomato',
		lettuce: 'Lettuce',
		lettuceSlice: 'Cut Lettuce',
		cheese: 'Cheese',
		cutCheese: 'Cut Cheese',
		onion: 'Onion',
		cutOnion: 'Cut Onion',
		tacoShell: 'Taco',
		cookedMeat: 'Cooked Meat'
	};
</script>

<div class="holding">
	<div class="modelWrap">
		<Canvas>
			<T.AmbientLight intensity={3} />
			<T.PerspectiveCamera
				makeDefault
				position={[1, 1, 1]}
				oncreate={(ref) => {
					ref.lookAt(0, 0, 0);
				}}
			/>
			{#if playerData.carrying.type != 'air'}
				<HeldModel />
			{/if}
		</Canvas>
	</div>
	<p>{cleanNames[playerData.carrying.type]}</p>
</div>

<style lang="scss">
	.holding {
		position: fixed;
		top: 0px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1000;
		padding: 0.25rem 1rem;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 0.5rem;
		margin-top: 0.5rem;
		height: 3rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		color: white;
		font-size: 1.2rem;
	}
	.modelWrap {
		height: 3rem;
		width: 3rem;
	}
</style>
