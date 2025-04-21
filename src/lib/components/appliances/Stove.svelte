<script lang="ts">
	import { type Carryable } from '$lib/types/Carryable';
	import { T, useTask } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	import { kitchenItems, playerData } from '$lib/sharedState.svelte';
	import { registerEListener, unregisterEListener } from '$lib/keyManager';
	import type { RigidBodyUserData } from '$lib/types/RigidBodyUserData';
	import { holdableModels } from '$lib/components/holdables/holdableItems';
	import { cookables } from '$lib/components/cookables';

	const {
		id
	}: {
		id: string;
	} = $props();

	const thisStove = $derived(kitchenItems[id]);

	let lastEvent: DOMHighResTimeStamp = 0;
	let cookingProgress = 0; // When this gets to one we are done
	let holding: Carryable = $derived(thisStove.holding);
	let HoldingModel = $derived(holdableModels[thisStove.holding]);

	useTask((deltaTime) => {
		if (cookables[holding]) {
			cookingProgress += (deltaTime * 1000) / cookables[holding].cookTime;
			console.log(cookingProgress);
			if (cookingProgress > 1) {
				cookingProgress = 0;
				thisStove.holding = cookables[holding].result;
			}
		}
	});

	const getPlaceItem = () => {
		const n = performance.now();
		if (n - lastEvent < 300) {
			return;
		}
		lastEvent = performance.now();
		if (holding == 'air') {
			placeItem();
		} else {
			if (playerData.carrying == 'air') {
				pickUpItem();
			}
		}
	};

	const placeItem = () => {
		thisStove.holding = playerData.carrying;
		playerData.carrying = 'air';
		cookingProgress = 0;
	};
	const pickUpItem = () => {
		playerData.carrying = holding;
		thisStove.holding = 'air';
		cookingProgress = 0;
	};
</script>

<T.Group>
	<AutoColliders
		oncollisionenter={(e) => {
			if ((e.targetRigidBody?.userData as RigidBodyUserData).name == 'player') {
				registerEListener(id, getPlaceItem);
			}
		}}
		oncollisionexit={(e) => {
			if ((e.targetRigidBody?.userData as RigidBodyUserData).name == 'player') {
				unregisterEListener(id);
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
