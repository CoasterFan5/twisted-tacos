<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import Player from './Player.svelte';
	import { keyTick } from '$lib/keyManager';
	import {
		kitchenData,
		newSpeed,
		orders,
		playerData,
		playerSpeed,
		realPlayerSpeed
	} from '$lib/sharedState.svelte';
	import Level from '$lib/components/Level.svelte';
	import { getRandomTacoOrder } from '$lib/tacos/getRandomOrder';
	import type { KitchenLayout } from './types/KitchenLayout';

	$effect(() => {
		if (Math.abs(realPlayerSpeed.x) + Math.abs(realPlayerSpeed.z) > 0.1) {
			playerData.animationState = 'walk';
		} else {
			playerData.animationState = 'idle';
		}
	});

	export const {
		kitch
	}: {
		kitch: KitchenLayout;
	} = $props();

	kitchenData.data = kitch;

	let timeSinceLastTaco = 10;

	useTask((timeDiff) => {
		newSpeed.setX(-playerSpeed.x * 0.1);
		newSpeed.setZ(-playerSpeed.z * 0.1);
		keyTick(timeDiff);
		playerSpeed.add(newSpeed);
		if (playerSpeed.length() > 1) {
			playerSpeed.normalize();
		}
		const speedConstant = 5;
		realPlayerSpeed.x = playerSpeed.x * speedConstant;
		realPlayerSpeed.y = playerSpeed.y * speedConstant;
		realPlayerSpeed.z = playerSpeed.z * speedConstant;

		if (timeSinceLastTaco > 10 && orders.length < 4) {
			timeSinceLastTaco = 0;
			orders.push({
				id: Math.random(),
				req: getRandomTacoOrder()
			});
		}
		timeSinceLastTaco += timeDiff;
		playerData.timeInDay += timeDiff;
	});
</script>

<T.Group>
	<T.PerspectiveCamera
		makeDefault
		position={[-10, 10, 0]}
		oncreate={(ref) => {
			ref.lookAt(0, 0, 0);
		}}
	/>
</T.Group>

<T.AmbientLight color="white" intensity={1} />

<Level />

<Player />

<style lang="scss">
</style>
