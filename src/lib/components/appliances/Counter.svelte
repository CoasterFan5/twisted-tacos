<script lang="ts">
	import { type RigidBodyUserData } from '$lib/types/RigidBodyUserData';
	import { T } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	import { kitchenData, playerData } from '$lib/sharedState.svelte';
	import {
		registerEListener,
		registerInteractListener,
		unregisterEListener,
		unRegisterInteractListener
	} from '$lib/keyManager';
	import { allowedChildren } from '$lib/components/holdables/holdableItems';
	import { counterInteractables } from '$lib/components/counterInteractables';
	import { holdableBuilder } from '../holdables/holdableBuilder';
	import HoldableRender from '../holdables/HoldableRender.svelte';
	import CounterBase from './CounterBase.svelte';

	const kitchenItems = $derived(kitchenData.data);

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
		if (thisCounter.holding.type == 'air') {
			console.warn('Place Triggered xx');
			thisCounter.holding = playerData.carrying;
			playerData.carrying = holdableBuilder('air');
		} else if (playerData.carrying.type == 'air') {
			console.warn('Pickup Triggered oo');
			playerData.carrying = thisCounter.holding;
			thisCounter.holding = holdableBuilder('air');
		} else {
			const thisAllowedChildren = allowedChildren[thisCounter.holding.type];
			if (thisAllowedChildren && thisAllowedChildren[playerData.carrying.type]) {
				if (thisCounter.holding.children[playerData.carrying.type]) {
					return;
				}
				thisCounter.holding.children[playerData.carrying.type] = playerData.carrying;
				playerData.carrying = holdableBuilder('air');
			} else if (thisCounter.holding.type == 'plate' && thisCounter.holding.children.tacoShell) {
				if (thisCounter.holding.children.tacoShell.children[playerData.carrying.type]) {
					return;
				}
				const foundATaco = thisCounter.holding.children.tacoShell;
				foundATaco.children[playerData.carrying.type] = playerData.carrying;
				playerData.carrying = holdableBuilder('air');
			}
			return;
		}

		return;
	};

	const interact = (timeDiff: number) => {
		const interactionDetails = counterInteractables[thisCounter.holding.type];
		if (interactionDetails) {
			interactCompletion += timeDiff / (interactionDetails.interactTime / 1000);
			console.log(interactCompletion);

			if (interactCompletion >= 1) {
				thisCounter.holding = interactionDetails.result;
			}
		}
	};
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
		<CounterBase />
		<T.Group position={[0, 0.5, 0]}>
			<HoldableRender carryable={thisCounter.holding} />
		</T.Group>
	</AutoColliders>
</T.Group>
