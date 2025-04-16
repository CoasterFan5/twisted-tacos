<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { playerPos, playerSpeed, realPlayerSpeed } from './sharedState.svelte';
	import { AutoColliders, RigidBody } from '@threlte/rapier';
	import { Group, Vector3, type Object3DEventMap } from 'three';

	let g: Group<Object3DEventMap> | undefined = $state(undefined);

	useTask(() => {
		if (g) {
			const wp = g.getWorldPosition(new Vector3());
			playerPos.x = wp.x;
			playerPos.z = wp.z;
			console.log($state.snapshot(playerPos), Date.now());
			g.lookAt(new Vector3(playerPos.x, playerPos.y, playerPos.z).add(playerSpeed.clone()));
		}
	});
</script>

<RigidBody
	type="dynamic"
	linearVelocity={[realPlayerSpeed.x, realPlayerSpeed.y, realPlayerSpeed.z]}
	lockRotations
	enabledRotations={[false, false, false]}
	enabledTranslations={[true, false, true]}
>
	<T.Group bind:ref={g} rotation={[0, 0, 0]}>
		<AutoColliders shape="cuboid">
			<T.Mesh>
				<T.BoxGeometry args={[1, 1, 1]} />
				<T.MeshBasicMaterial color="red" />
			</T.Mesh>
		</AutoColliders>
		<T.Mesh position={[0, 0, 1]}>
			<T.BoxGeometry args={[0.1, 0.1, 1]} />
			<T.MeshBasicMaterial color="red" />
		</T.Mesh>
	</T.Group>
</RigidBody>
