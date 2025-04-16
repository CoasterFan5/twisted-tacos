<script lang="ts">
	import { T } from '@threlte/core';
	import { playerPos } from './sharedState.svelte';
	import Floor from '$lib/components/Floor.svelte';
</script>

<T.PerspectiveCamera
	makeDefault
	position={[-7, 7, 0]}
	oncreate={(ref) => {
		ref.lookAt(0, 0, 0);
	}}
/>

<T.DirectionalLight position={[0, 0, 0]} />

<Floor />

<T.Mesh position={[playerPos.x, 0.5, playerPos.z]}>
	<T.BoxGeometry args={[1, 1, 1]} />
	<T.MeshBasicMaterial color="red" />
</T.Mesh>
