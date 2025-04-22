<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	import { kitchenData, playerData } from '$lib/sharedState.svelte';
	import { registerEListener, unregisterEListener } from '$lib/keyManager';
	import type { RigidBodyUserData } from '$lib/types/RigidBodyUserData';
	import { holdableModels } from '$lib/components/holdables/holdableItems';
	import { cookables } from '$lib/components/cookables';
	import { holdableBuilder } from '../holdables/holdableBuilder';
	import CounterBase from './CounterBase.svelte';

	const kitchenItems = $derived(kitchenData.data);

	const {
		id
	}: {
		id: string;
	} = $props();

	let active = $state(false);

	const thisStove = $derived(kitchenItems[id]);

	let lastEvent: DOMHighResTimeStamp = 0;
	let cookingProgress = $state(0); // When this gets to one we are done
	let holding = $derived(thisStove.holding);
	let HoldingModel = $derived(holdableModels[thisStove.holding.type]);

	useTask((deltaTime) => {
		const cookData = cookables[holding.type];

		if (cookData) {
			cookingProgress += (deltaTime * 1000) / cookData.cookTime;
			console.log(cookingProgress);
			if (cookingProgress > 1) {
				cookingProgress = 0;
				thisStove.holding = cookData.result;
				if (thisStove.holding.type == 'burntMeat') {
					playerData.meatBurn += 1;
				}
			}
		}
	});

	const getPlaceItem = () => {
		const n = performance.now();
		if (n - lastEvent < 300) {
			return;
		}
		lastEvent = performance.now();
		if (holding.type == 'air') {
			placeItem();
		} else {
			if (playerData.carrying.type == 'air') {
				pickUpItem();
			}
		}
	};

	const placeItem = () => {
		thisStove.holding = playerData.carrying;
		playerData.carrying = holdableBuilder('air');
		cookingProgress = 0;
	};
	const pickUpItem = () => {
		playerData.carrying = holding;
		thisStove.holding = holdableBuilder('air');
		cookingProgress = 0;
	};
</script>

<T.Group>
	<T.Group position={[0, 0.005, 0]}>
		<T.Mesh>
			<T.CylinderGeometry args={[0.5, 0.5, 1, 10, 10, false, 0, Math.PI * 2 * cookingProgress]} />
			<T.MeshBasicMaterial color="green" />
		</T.Mesh>
	</T.Group>
	<AutoColliders
		oncollisionenter={(e) => {
			if ((e.targetRigidBody?.userData as RigidBodyUserData).name == 'player') {
				registerEListener(id, getPlaceItem);
				active = true;
			}
		}}
		oncollisionexit={(e) => {
			if ((e.targetRigidBody?.userData as RigidBodyUserData).name == 'player') {
				unregisterEListener(id);
				active = false;
			}
		}}
	>
		<T.Group
			>{#if active}
				<T.Mesh>
					<T.BoxGeometry args={[1.01, 1.01, 1.01]} />
					<T.MeshBasicMaterial opacity={0.5} transparent={true} />
				</T.Mesh>
			{/if}
			<CounterBase />
			<T.Group position={[0, 0.55, 0]}>
				<HoldingModel />
			</T.Group>
			<T.Group position={[0, 0.0, 0]}>
				<T.Mesh position={[0, 0.01, 0]}>
					<T.CylinderGeometry args={[0.4, 0.4, 1]} />
					<T.MeshBasicMaterial color="white" />
				</T.Mesh>
				<T.Mesh position={[0, 0.02, 0]}>
					<T.CylinderGeometry args={[0.35, 0.35, 1]} />
					<T.MeshBasicMaterial color="gray" />
				</T.Mesh>
				<T.Mesh position={[0, 0.03, 0]}>
					<T.CylinderGeometry args={[0.25, 0.25, 1]} />
					<T.MeshBasicMaterial color="black" />
				</T.Mesh>
				<T.Mesh position={[0, 0.04, 0]}>
					<T.CylinderGeometry args={[0.2, 0.2, 1]} />
					<T.MeshBasicMaterial color="gray" />
				</T.Mesh>
				<T.Mesh position={[0, 0.05, 0]}>
					<T.BoxGeometry args={[0.4, 1, 0.05]} />
					<T.MeshBasicMaterial color="black" />
				</T.Mesh>
				<T.Mesh position={[0, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
					<T.BoxGeometry args={[0.4, 1, 0.05]} />
					<T.MeshBasicMaterial color="black" />
				</T.Mesh>
			</T.Group>
		</T.Group>
	</AutoColliders>
</T.Group>
