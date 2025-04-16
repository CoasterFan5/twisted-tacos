<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { World } from '@threlte/rapier';
	import { keyTick, registerActiveKey, removeActiveKey } from './keyManager';
	import { onMount } from 'svelte';

	let lastTick: DOMHighResTimeStamp | undefined = undefined;

	const tick = (ts: DOMHighResTimeStamp) => {
		if (lastTick) {
			const timeDiff = (ts - lastTick) / 1000;
			lastTick = ts;

			keyTick(timeDiff);
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
