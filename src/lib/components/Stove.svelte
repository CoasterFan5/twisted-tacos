<script lang="ts">
	import { cookables, type Carryable } from '$lib/types/Carryable';
	import { T, useTask } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	import { kitchen, playerData } from '../../routes/play/sharedState.svelte';
	import {
		registerInteractListener,
		unregisterInteractListener
	} from '../../routes/play/keyManager';
	import type { RigidBodyUserData } from '$lib/types/RigidBodyUserData';
	import { holdableModels } from './holdables/holdableItems';

	const {
		id
	}: {
		id: string;
	} = $props();

	let cookingProgress = 0; // When this gets to one we are done
	let holding: Carryable = $derived(kitchen.stoves[id].holding);
	let HoldingModel = $derived(holdableModels[kitchen.stoves[id].holding]);

	useTask((deltaTime) => {
		if (cookables[holding]) {
			cookingProgress += (deltaTime * 1000) / cookables[holding].cookTime;
			console.log(cookingProgress);
			if (cookingProgress > 1) {
				kitchen.stoves[id].holding = cookables[holding].result;
			}
		}
	});

	const getPlaceItem = () => {
		if (holding == 'air') {
			placeItem();
		} else {
			if (playerData.carrying == 'air') {
				pickUpItem();
			}
		}
	};

	const placeItem = () => {
		kitchen.stoves[id].holding = playerData.carrying;
		playerData.carrying = 'air';
		cookingProgress = 0;
	};
	const pickUpItem = () => {
		playerData.carrying = holding;
		kitchen.stoves[id].holding = 'air';
		cookingProgress = 0;
	};
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
			<T.MeshBasicMaterial color="black" />
		</T.Mesh>
		<T.Group position={[0, 0.5, 0]}>
			<HoldingModel />
		</T.Group>
	</AutoColliders>
</T.Group>
