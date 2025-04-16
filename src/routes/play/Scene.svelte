<script lang="ts">
	import { T } from '@threlte/core';
	import Floor from '$lib/components/Floor.svelte';
	import Player from './Player.svelte';
	import { AutoColliders } from '@threlte/rapier';
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
<T.Group position={[5, 0, 0]}>
	<AutoColliders shape="cuboid">
		<T.Mesh>
			<T.BoxGeometry args={[0.1, 1, 10]} />
			<T.MeshBasicMaterial color="blue" />
		</T.Mesh>
	</AutoColliders>
</T.Group>

<Player />
