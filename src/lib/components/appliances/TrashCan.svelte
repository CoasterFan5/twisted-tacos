<script lang="ts">
	import { type RigidBodyUserData } from '$lib/types/RigidBodyUserData';
	import { T } from '@threlte/core';
	import { Collider } from '@threlte/rapier';
	import { playerData } from '$lib/sharedState.svelte';
	import { registerEListener, unregisterEListener } from '$lib/keyManager';
	import { holdableBuilder } from '../holdables/holdableBuilder';

	let lastEvent: DOMHighResTimeStamp = 0;

	const {
		id
	}: {
		id: string;
	} = $props();

	let active = $state(false);

	const placeItem = () => {
		const n = performance.now();
		if (n - lastEvent < 300) {
			return;
		}
		lastEvent = performance.now();
		if (playerData.carrying.type == 'plate') {
			playerData.carrying.children = {};
			return;
		}
		playerData.carrying = holdableBuilder('air');

		return;
	};
</script>

<T.Group>
	<Collider
		shape="cuboid"
		args={[0.5, 0.5, 0.5]}
		oncollisionenter={(e) => {
			if ((e.targetRigidBody?.userData as RigidBodyUserData).name == 'player') {
				registerEListener(id, placeItem);
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
		<T.Mesh>
			<T.CylinderGeometry args={[0.45, 0.4, 0.75]} />
			<T.MeshBasicMaterial color="gray" />
		</T.Mesh>
		{#if active}
			<T.Mesh>
				<T.CylinderGeometry args={[0.46, 0.41, 0.77]} />
				<T.MeshBasicMaterial color="white" opacity={0.5} transparent={true} />
			</T.Mesh>
		{/if}
		<T.Mesh>
			<T.CylinderGeometry args={[0.4, 0.3, 0.76]} />
			<T.MeshBasicMaterial color="black" />
		</T.Mesh>
		{#each { length: 18 }, i}
			{@const r = (i * 2 * Math.PI) / 18}
			<T.Group rotation={[0, r, 0]}>
				<T.Mesh position={[0, 0, 0.42]} rotation={[0.08, 0, 0]}>
					<T.CylinderGeometry args={[0.02, 0.02, 0.74]} />
					<T.MeshBasicMaterial color="#9b9b9b" />
				</T.Mesh>
			</T.Group>
		{/each}
	</Collider>
</T.Group>
