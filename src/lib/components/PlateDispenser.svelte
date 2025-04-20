<script lang="ts">
	import { type RigidBodyUserData } from '$lib/types/RigidBodyUserData';
	import { T } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	import { playerData } from '../../routes/play/sharedState.svelte';
	import { registerEListener, unregisterEListener } from '../../routes/play/keyManager';

	const {
		id
	}: {
		id: string;
	} = $props();

	const getItem = () => {
		if (playerData.carrying == 'air') {
			playerData.carrying = 'plate';
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
			<T.BoxGeometry args={[1, 1, 1]} />
			<T.MeshBasicMaterial color="purple" />
		</T.Mesh>
	</AutoColliders>
</T.Group>
