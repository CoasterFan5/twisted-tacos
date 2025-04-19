<script lang="ts">
	import { type RigidBodyUserData } from '$lib/types/RigidBodyUserData';
	import { T } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	import { kitchen, playerData } from '../../routes/play/sharedState.svelte';
	import {
		registerInteractListener,
		unregisterInteractListener
	} from '../../routes/play/keyManager';
	import { holdableModels } from './holdables/holdableItems';

	const {
		id
	}: {
		id: string;
	} = $props();

	let lastEvent: DOMHighResTimeStamp = 0;
	const getPlaceItem = () => {
		const n = performance.now();
		if (n - lastEvent < 300) {
			return;
		}
		lastEvent = performance.now();
		if (playerData.carrying != 'air') {
			console.warn('Place Triggered xx');
			if (kitchen.counters[id].holding == 'air') {
				kitchen.counters[id].holding = playerData.carrying;
				playerData.carrying = 'air';
			}
		} else {
			if (kitchen.counters[id].holding != 'air') {
				console.warn('Pickup Triggered oo');
				playerData.carrying = kitchen.counters[id].holding;
				kitchen.counters[id].holding = 'air';
			}
		}

		return;
	};

	let Holding = $derived(holdableModels[kitchen.counters[id].holding]);
</script>

<T.Group>
	<AutoColliders
		oncollisionenter={(e) => {
			if ((e.targetRigidBody?.userData as RigidBodyUserData).name == 'player') {
				registerInteractListener(id, getPlaceItem);
			}
		}}
		oncollisionexit={(e) => {
			if ((e.targetRigidBody?.userData as RigidBodyUserData).name == 'player') {
				unregisterInteractListener(id);
			}
		}}
	>
		<T.Mesh>
			<T.BoxGeometry args={[1, 1, 1]} />
			<T.MeshBasicMaterial color="yellow" />
		</T.Mesh>
		<T.Group position={[0, 0.5, 0]}>
			<Holding />
		</T.Group>
	</AutoColliders>
</T.Group>
