<script lang="ts">
	import { type RigidBodyUserData } from '$lib/types/RigidBodyUserData';
	import { T } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	import { kitchenData, playerData } from '$lib/sharedState.svelte';
	import { registerEListener, unregisterEListener } from '$lib/keyManager';
	import Plate from '../holdables/Plate.svelte';
	import { holdableBuilder } from '../holdables/holdableBuilder';
	import CounterBase from './CounterBase.svelte';

	const kitchenItems = $derived(kitchenData.data);

	const {
		id
	}: {
		id: string;
	} = $props();

	const thisPlateDispenser = $derived(kitchenItems[id]);

	let lastEvent: DOMHighResTimeStamp = 0;
	const getPlaceItem = () => {
		const n = performance.now();
		if (n - lastEvent < 300) {
			return;
		}
		lastEvent = performance.now();
		if (playerData.carrying.type == 'air' && thisPlateDispenser.stock > 0) {
			playerData.carrying = holdableBuilder('plate');
			thisPlateDispenser.stock = Math.round(thisPlateDispenser.stock - 1);
			return;
		}
		if (playerData.carrying.type == 'plate') {
			playerData.carrying = holdableBuilder('air');
			thisPlateDispenser.stock = Math.round(thisPlateDispenser.stock + 1);
		}
	};

	let active = $state(false);
</script>

<T.Group>
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
		{#if active}
			<T.Mesh>
				<T.BoxGeometry args={[1.01, 1.01, 1.01]} />
				<T.MeshBasicMaterial opacity={0.5} transparent={true} />
			</T.Mesh>
		{/if}
		<CounterBase />
		{#each { length: thisPlateDispenser.stock }, i}
			<T.Group position={[0, i * 0.1 + 0.5, 0]}>
				<Plate />
			</T.Group>
		{/each}
	</AutoColliders>
</T.Group>
