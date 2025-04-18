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

	let paused = false;

	const {
	}: {
		id: string;
	} = $props();

	const getPlaceItem = () => {
		if (paused) {
			return;
		}
		paused = true;
		if (playerData.carrying != 'air') {
			if (kitchen.counters[id].holding == 'air') {
				kitchen.counters[id].holding = playerData.carrying;
				playerData.carrying = 'air';
			}
		} else {
			if (kitchen.counters[id].holding != 'air') {
				playerData.carrying = kitchen.counters[id].holding;
				kitchen.counters[id].holding = 'air';
			}
		}

		setInterval(() => {
			paused = false;
		}, 250);

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
