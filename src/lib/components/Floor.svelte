<script lang="ts">
	import { T } from '@threlte/core';
</script>

<T.Group position={[0, -0.5, 0]}>
	<T.Mesh receiveShadow>
		<T.BoxGeometry args={[10, 0.01, 10]} />
		<T.MeshStandardMaterial />
	</T.Mesh>
</T.Group>
