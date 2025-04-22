<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import Scene from '$lib/Scene.svelte';
	import { World } from '@threlte/rapier';
	import { registerActiveKey, removeActiveKey } from '$lib/keyManager';
	import { playerData } from '$lib/sharedState.svelte';
	import Overlay from '$lib/components/ui/Overlay.svelte';
	import { kitchenLayout } from './kitchenLayout';

	$effect(() => {
		const highScore = parseInt(localStorage.getItem('highScore') || '0');
		playerData.highScore = highScore;
	});
</script>

<svelte:body onkeydown={registerActiveKey} onkeyup={removeActiveKey} />

<div class="wrap">
	<Overlay />
	<Canvas autoRender={true} renderMode="always">
		<World>
			<T.BoxHelper>
				<Scene kitch={kitchenLayout} />
			</T.BoxHelper>
		</World>
	</Canvas>
</div>

<style>
	.wrap {
		height: 100vh;
		width: 100%;
		background: black;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
