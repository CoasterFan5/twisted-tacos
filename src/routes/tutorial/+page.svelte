<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import Scene from '$lib/Scene.svelte';
	import { World } from '@threlte/rapier';
	import {
		registerActiveKey,
		registerEListener,
		registerInteractListener,
		removeActiveKey,
		unregisterEListener,
		unRegisterInteractListener
	} from '$lib/keyManager';
	import { kitchenData, playerData, tutorialData } from '$lib/sharedState.svelte';
	import Overlay from '$lib/components/ui/Overlay.svelte';
	import { kitchenLayout } from './kitchenLayout';
	import { applianceBuilder } from '$lib/components/appliances/applianceBuilder';
	import { Vector2 } from 'three';
	import { holdableBuilder } from '$lib/components/holdables/holdableBuilder';
	import { goto } from '$app/navigation';

	const advanceMaxStage = () => {
		tutorialData.maxAllowedStage = Math.round(tutorialData.maxAllowedStage + 1);
	};
	tutorialData.maxAllowedStage = 0;
	tutorialData.stage = 0;

	$effect(() => {
		switch (tutorialData.stage) {
			case 0:
				registerEListener('tutorial', () => {
					unregisterEListener('tutorial');
					advanceMaxStage();
				});
				break;
			case 1:
				registerInteractListener('tutorial', () => {
					unRegisterInteractListener('tutorial');
					advanceMaxStage();
				});
				break;
			case 2:
				kitchenData.data['t_spin'] = applianceBuilder.spinner({
					position: new Vector2(4, -5)
				});
				registerInteractListener('tutorial', () => {
					unRegisterInteractListener('tutorial');
					advanceMaxStage();
				});
				break;
			case 3:
				registerEListener('tutorial', () => {
					unregisterEListener('tutorial');
					advanceMaxStage();
				});
				break;
			case 4:
				kitchenData.data['t_meat'] = applianceBuilder.counter({
					position: new Vector2(4, 2),
					holding: holdableBuilder('meat')
				});
				kitchenData.data['t_stove'] = applianceBuilder.stove({
					position: new Vector2(4, 1)
				});
				registerEListener('tutorial', () => {
					unregisterEListener('tutorial');
					advanceMaxStage();
				});
				break;
			case 5:
				kitchenData.data['t_tacoshell'] = applianceBuilder.counter({
					position: new Vector2(4, 0),
					holding: holdableBuilder('tacoShell')
				});

				registerEListener('tutorial', () => {
					unregisterEListener('tutorial');
					advanceMaxStage();
				});
				break;
			case 6:
				registerEListener('tutorial', () => {
					unregisterEListener('tutorial');
					advanceMaxStage();
				});
				break;
			case 7:
				kitchenData.data['t_plate'] = applianceBuilder.plateDispenser({
					position: new Vector2(4, -1),
					stock: 3
				});

				registerEListener('tutorial', () => {
					unregisterEListener('tutorial');
					advanceMaxStage();
				});
				break;
			case 8:
				kitchenData.data['t_serve'] = applianceBuilder.foodDelivery({
					position: new Vector2(1, -5)
				});

				registerEListener('tutorial', () => {
					unregisterEListener('tutorial');
					advanceMaxStage();
				});
				break;
			case 9:
				goto('/');
				break;
			case 10:
				goto('/');
				break;
		}
	});
</script>

<svelte:body onkeydown={registerActiveKey} onkeyup={removeActiveKey} />

<div class="wrap">
	<span class="a">
		Carrying {JSON.stringify(playerData.carrying)}
	</span>

	<Overlay tutorialMode={true} />
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
