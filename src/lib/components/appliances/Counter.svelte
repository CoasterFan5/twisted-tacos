<script lang="ts">
	import { type RigidBodyUserData } from '$lib/types/RigidBodyUserData';
	import { T } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	import { kitchenItems, playerData } from '$lib/sharedState.svelte';
	import {
		registerEListener,
		registerInteractListener,
		unregisterEListener,
		unRegisterInteractListener
	} from '$lib/keyManager';
	import { holdableModels } from '$lib/components/holdables/holdableItems';
	import { counterInteractables } from '$lib/components/counterInteractables';

	const {
		id
	}: {
		id: string;
	} = $props();

	let interactCompletion = 0;

	const thisCounter = $derived(kitchenItems[id]);

	let lastEvent: DOMHighResTimeStamp = 0;
	const getPlaceItem = () => {
		const n = performance.now();
		if (n - lastEvent < 300) {
			return;
		}
		lastEvent = performance.now();
		if (playerData.carrying != 'air') {
			console.warn('Place Triggered xx');
			if (thisCounter.holding == 'air') {
				thisCounter.holding = playerData.carrying;
				playerData.carrying = 'air';
			}
		} else {
			if (thisCounter.holding != 'air') {
				console.warn('Pickup Triggered oo');
				playerData.carrying = thisCounter.holding;
				thisCounter.holding = 'air';
			}
		}

		return;
	};

	const interact = (timeDiff: number) => {
		const interactionDetails = counterInteractables[thisCounter.holding];
		if (interactionDetails) {
			interactCompletion += timeDiff / (interactionDetails.interactTime / 1000);
			console.log(interactCompletion);

			if (interactCompletion >= 1) {
				thisCounter.holding = interactionDetails.result;
			}
		}
	};

	let Holding = $derived(holdableModels[kitchenItems[id].holding]);
</script>

<T.Group>
	<AutoColliders
		oncollisionenter={(e) => {
			if ((e.targetRigidBody?.userData as RigidBodyUserData).name == 'player') {
				registerEListener(id, getPlaceItem);
				registerInteractListener(id, interact);
				interactCompletion = 0;
			}
		}}
		oncollisionexit={(e) => {
			if ((e.targetRigidBody?.userData as RigidBodyUserData).name == 'player') {
				unregisterEListener(id);
				unRegisterInteractListener(id);
				interactCompletion = 0;
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
