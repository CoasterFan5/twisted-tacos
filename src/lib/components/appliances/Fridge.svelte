<script lang="ts">
	import { type RigidBodyUserData } from '$lib/types/RigidBodyUserData';
	import { T } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	import { kitchenData, playerData } from '$lib//sharedState.svelte';
	import { registerEListener, unregisterEListener } from '$lib/keyManager';

	const kitchenItems = $derived(kitchenData.data);

	const {
		id
	}: {
		id: string;
	} = $props();

	const getItem = () => {
		if (playerData.carrying.type == 'air') {
			playerData.carrying = kitchenItems[id].holding;
		}
	};
</script>

<T.Group>
	<AutoColliders
		oncollisionenter={(e) => {
			if ((e.targetRigidBody?.userData as RigidBodyUserData).name == 'player') {
				registerEListener(id, getItem);
			}
		}}
		oncollisionexit={(e) => {
			if ((e.targetRigidBody?.userData as RigidBodyUserData).name == 'player') {
				unregisterEListener(id);
			}
		}}
	>
		<T.Mesh>
			<T.BoxGeometry args={[1, 2, 1]} />
			<T.MeshBasicMaterial color="white" />
		</T.Mesh>
	</AutoColliders>
</T.Group>
