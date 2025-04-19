<script>
	import { T } from '@threlte/core';
	import Wall from './Wall.svelte';
</script>

<T.Group>
	<T.Group>
		<Wall></Wall>
	</T.Group>
	<T.Group position={[0, 2, 0]} rotation={[Math.PI, 0, 0]}>
		<Wall></Wall>
	</T.Group>
</T.Group>
