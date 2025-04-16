<script lang="ts">
	import { T } from '@threlte/core';
	import { realPlayerSpeed } from './sharedState.svelte';
	import { AutoColliders, RigidBody } from '@threlte/rapier';
</script>

<T.Group position={[0, 0, 0]}>
	<RigidBody
		type="dynamic"
		linearVelocity={[realPlayerSpeed.x, realPlayerSpeed.y, realPlayerSpeed.z]}
		lockRotations
		enabledRotations={[false, false, false]}
		enabledTranslations={[true, false, true]}
	>
		<AutoColliders shape="cuboid">
			<T.Mesh>
				<T.BoxGeometry args={[1, 1, 1]} />
				<T.MeshBasicMaterial color="red" />
			</T.Mesh>
		</AutoColliders>
	</RigidBody>
</T.Group>
