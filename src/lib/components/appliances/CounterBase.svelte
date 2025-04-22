<script lang="ts">
	import { T } from '@threlte/core';
</script>

<T.Mesh scale={[1, 1, 1]}>
	<T.BoxGeometry args={[1, 0.99, 1]} />
	<T.MeshBasicMaterial color="#d3a66a" />
</T.Mesh>
<T.Mesh position={[0, 0.45, 0]}>
	<T.BoxGeometry args={[1, 0.1, 1]} />
	<T.MeshBasicMaterial color="#864d00" />
</T.Mesh>
