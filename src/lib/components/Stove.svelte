<script lang="ts">
	import type { Carryable } from '$lib/types/Carryable';
	import { T } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';

	const {
		id
	}: {
		id: string;
	} = $props();

	let cookingProgress = 0; // When this gets to one we are done
	let cooking = false;
	let holding: Carryable;

	const placeItem = () => {};
	const pickUpItem = () => {};
</script>

<T.Group>
	<AutoColliders
		oncollisionenter={(e) => {
			console.log(e.targetCollider.restitution() > 50);
		}}
	>
		<T.Mesh>
			<T.BoxGeometry args={[1, 1, 1]} />
			<T.MeshBasicMaterial color="black" />
		</T.Mesh>
	</AutoColliders>
</T.Group>
