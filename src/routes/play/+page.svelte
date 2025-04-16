<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { World } from '@threlte/rapier';
	import { keyTick, registerActiveKey, removeActiveKey } from './keyManager';
	import { onMount } from 'svelte';
	import { newSpeed, playerSpeed, realPlayerSpeed } from './sharedState.svelte';

	let lastTick: DOMHighResTimeStamp | undefined = undefined;

	const tick = (ts: DOMHighResTimeStamp) => {
		if (lastTick) {
			const timeDiff = (ts - lastTick) / 1000;
			lastTick = ts;

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
		}
		lastTick = ts;
		requestAnimationFrame(tick);
	};

	onMount(() => {
		requestAnimationFrame(tick);
	});
</script>

<svelte:body onkeydown={registerActiveKey} onkeyup={removeActiveKey} />

<Canvas>
	<World>
		<Scene />
	</World>
</Canvas>
