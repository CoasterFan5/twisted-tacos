<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { World } from '@threlte/rapier';
	import { registerActiveKey, removeActiveKey } from '$lib/keyManager';
	import { playerData } from '$lib/sharedState.svelte';
</script>

<svelte:body onkeydown={registerActiveKey} onkeyup={removeActiveKey} />

<span class="a">
	Carrying {JSON.stringify(playerData.carrying)}
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
		z-index: 1000;
		color: white;
		padding: 1rem;
		background: rgba(0, 0, 0, 0.9);
		top: 0px;
		right: 0px;
	}
</style>
