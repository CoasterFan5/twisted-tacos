<script lang="ts">
	import { T } from '@threlte/core';
	import Floor from '$lib/components/Floor.svelte';
	import Player from './Player.svelte';
	import { AutoColliders } from '@threlte/rapier';
	import CursorCapture from '$lib/components/CursorCapture.svelte';
	import Plate from '$lib/components/Plate.svelte';
</script>

<T.PerspectiveCamera
	makeDefault
	position={[-10, 10, 0]}
	oncreate={(ref) => {
		ref.lookAt(0, 0, 0);
	}}
/>

<T.DirectionalLight position={[0, 5, 10]} color="white" intensity={3} />
<T.AmbientLight color="white" intensity={1} />

<Plate />
<Floor />
<T.Group position={[0, 0, 0]}>
	<AutoColliders shape="cuboid">
		<T.Mesh position={[5, 0, 0]}>
			<T.BoxGeometry args={[0.1, 2, 10]} />
			<T.MeshBasicMaterial color="blue" />
		</T.Mesh>
		<T.Mesh position={[0, 0, 5]}>
			<T.BoxGeometry args={[10, 2, 0.1]} />
			<T.MeshBasicMaterial color="blue" />
		</T.Mesh>
		<T.Mesh position={[-5, 0, 0]}>
			<T.BoxGeometry args={[0.1, 2, 10]} />
			<T.MeshBasicMaterial color="blue" />
		</T.Mesh>
		<T.Mesh position={[0, 0, -5]}>
			<T.BoxGeometry args={[10, 2, 0.1]} />
			<T.MeshBasicMaterial color="blue" />
		</T.Mesh>
	</AutoColliders>
</T.Group>
<CursorCapture />

<Player />
