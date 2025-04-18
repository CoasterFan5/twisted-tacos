<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { playerPos, playerSpeed, realPlayerSpeed } from './sharedState.svelte';
	import { Collider, RigidBody } from '@threlte/rapier';
	import { Group, Vector3, type Object3DEventMap } from 'three';
	import { GLTF } from '@threlte/extras';

	let g: Group<Object3DEventMap> | undefined = $state(undefined);

	useTask(() => {
		if (g) {
			const wp = g.getWorldPosition(new Vector3());
			playerPos.x = wp.x;
			playerPos.z = wp.z;
			g.lookAt(new Vector3(playerPos.x, playerPos.y, playerPos.z).add(playerSpeed.clone()));
		}
	});
</script>

<RigidBody
	userData={{
		name: 'player'
	}}
	type="dynamic"
	linearVelocity={[realPlayerSpeed.x, realPlayerSpeed.y, realPlayerSpeed.z]}
	lockRotations
	enabledRotations={[false, false, false]}
	enabledTranslations={[true, false, true]}
>
	<T.Group
		bind:ref={g}
		rotation={[0, 0, 0]}
		userData={{
			type: 'player'
		}}
	>
		<Collider shape="cylinder" args={[10, 0.5]}>
			<T.Group scale={[1.5, 2, 1.5]} position={[0, -0.5, 0]}>
				<GLTF url="/assets/arcade/Models/GLB/character-employee.glb" />
			</T.Group>
		</Collider>

		<T.Mesh position={[0, 0, 0.5]}>
			<T.BoxGeometry args={[0.01, 0.01, 1]} />
			<T.MeshBasicMaterial color="darkred" />
		</T.Mesh>
	</T.Group>
</RigidBody>
