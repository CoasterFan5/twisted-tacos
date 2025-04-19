<script lang="ts">
	import { type RigidBodyUserData } from '$lib/types/RigidBodyUserData';
	import { T } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	import { kitchen, playerData } from '../../routes/play/sharedState.svelte';
	import { registerEListener, unregisterEListener } from '../../routes/play/keyManager';

	const {
		id
	}: {
		id: string;
	} = $props();

	const getItem = () => {
		if (playerData.carrying == 'air') {
			playerData.carrying = kitchen.fridges[id].holding;
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
