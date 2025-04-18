<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { World } from '@threlte/rapier';
	import { keyTick, registerActiveKey, removeActiveKey } from './keyManager';
	import { onMount } from 'svelte';
	import { newSpeed, playerData, playerSpeed, realPlayerSpeed } from './sharedState.svelte';

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

<span class="a">
	Carrying {playerData.carrying}
</span>

<Canvas autoRender={true} renderMode="always">
	<World>
		<T.BoxHelper>
			<Scene />
		</T.BoxHelper>
	</World>
</Canvas>

<style>
	.a {
		position: fixed;
		padding: 1rem;
		background: rgba(0, 0, 0, 0.5);
		top: 0px;
		right: 0px;
	}
</style>
