<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import Scene from '$lib/Scene.svelte';
	import { World } from '@threlte/rapier';
	import { registerActiveKey, removeActiveKey } from '$lib/keyManager';
	import { playerData } from '$lib/sharedState.svelte';
	import Overlay from '$lib/components/ui/Overlay.svelte';
	import { kitchenLayout } from './kitchenLayout';
</script>

<svelte:body onkeydown={registerActiveKey} onkeyup={removeActiveKey} />

<div class="wrap">
	<span class="a">
		Carrying {JSON.stringify(playerData.carrying)}
	</span>

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
