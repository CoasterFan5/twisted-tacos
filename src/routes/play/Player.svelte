<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { playerData, playerPos, playerSpeed, realPlayerSpeed } from '$lib/sharedState.svelte';
	import { Collider, RigidBody } from '@threlte/rapier';
	import { Group, Vector3, type Object3DEventMap } from 'three';
	import { GLTF, useGltfAnimations } from '@threlte/extras';
	import PlayerModel from '$lib/components/PlayerModel.svelte';

	let g: Group<Object3DEventMap> | undefined = $state(undefined);
	let { gltf, actions } = useGltfAnimations();
	useTask(() => {
		if (g) {
			const wp = g.getWorldPosition(new Vector3());
			playerPos.x = wp.x;
			playerPos.z = wp.z;
			g.lookAt(new Vector3(playerPos.x, playerPos.y, playerPos.z).add(playerSpeed.clone()));
		}
	});

	console.log($state.snapshot(actions));
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
		<Collider shape="cylinder" args={[10, 0.4]}>
			<T.Group scale={[1.5, 2, 1.5]} position={[0, -0.5, 0]}>
				<PlayerModel />>
			</T.Group>
		</Collider>
	</T.Group>
</RigidBody>
