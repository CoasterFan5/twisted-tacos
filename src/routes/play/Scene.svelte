<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import Player from './Player.svelte';
	import { keyTick } from './keyManager';
	import { newSpeed, playerSpeed, realPlayerSpeed } from './sharedState.svelte';
	import Level from '$lib/components/Level.svelte';

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
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[-10, 10, 0]}
	oncreate={(ref) => {
		ref.lookAt(0, 0, 0);
	}}
/>

<T.AmbientLight color="white" intensity={1} />

<Level />

<Player />
