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

	let lastEvent: DOMHighResTimeStamp = 0;

	const {
		id
	}: {
		id: string;
	} = $props();

	const placeItem = () => {
		const n = performance.now();
		if (n - lastEvent < 300) {
			return;
		}
		lastEvent = performance.now();
		playerData.carrying = 'air';

		return;
	};

	let Holding = $derived(holdableModels[kitchen.trashCans[id].holding]);
</script>

<T.Group>
	<AutoColliders
		oncollisionenter={(e) => {
			if ((e.targetRigidBody?.userData as RigidBodyUserData).name == 'player') {
				registerInteractListener(id, placeItem);
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
			<T.MeshBasicMaterial color="green" />
		</T.Mesh>
		<T.Group position={[0, 0.5, 0]}>
			<Holding />
		</T.Group>
	</AutoColliders>
</T.Group>
