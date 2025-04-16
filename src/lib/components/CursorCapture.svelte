<script lang="ts">
	import { T } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { cursorPos } from '../../routes/play/sharedState.svelte';
	interactivity();
</script>

<T.Mesh
	onpointermove={(e) => {
		cursorPos.x = e.point.x as number;
		cursorPos.z = e.point.z as number;
	}}
	position={[0, -0.5, 0]}
	visible={false}
>
	<T.BoxGeometry args={[100, 0.01, 100]} />
	<T.MeshBasicMaterial color="pink" />
</T.Mesh>
