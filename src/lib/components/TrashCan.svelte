<script lang="ts">
	import { type RigidBodyUserData } from '$lib/types/RigidBodyUserData';
	import { T } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	import { playerData } from '../../routes/play/sharedState.svelte';
	import { registerEListener, unregisterEListener } from '../../routes/play/keyManager';

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
</script>

<T.Group>
	<AutoColliders
		oncollisionenter={(e) => {
			if ((e.targetRigidBody?.userData as RigidBodyUserData).name == 'player') {
				registerEListener(id, placeItem);
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
			<T.MeshBasicMaterial color="green" />
		</T.Mesh>
	</AutoColliders>
</T.Group>
