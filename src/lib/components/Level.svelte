<script lang="ts">
	import { T } from '@threlte/core';
	import FloorTile from './FloorTile.svelte';
	import { kitchenItems } from '$lib/sharedState.svelte';
	import { AutoColliders } from '@threlte/rapier';
	import { Sky } from '@threlte/extras';
	import Taco from './holdables/Taco.svelte';
	import { appliances } from './appliances/appliances';

	const tiles: {
		id: number;
		x: number;
		z: number;
		item: undefined | 'stove' | 'fridge';
	}[][] = Array.from({ length: 10 }, (_, x) =>
		Array.from({ length: 10 }, (_, z) => {
			return {
				id: Math.random(),
				x: x,
				z: z,
				item: undefined
			};
		})
	);

	tiles[5][0].item = 'stove';
	tiles[9][5].item = 'fridge';

	console.log(tiles);
</script>

<Taco />
<Sky elevation={2.5} turbidity={10} />
<T.Group position={[0, -0.5, 0]}>
	{#each tiles as row (row)}
		{#each row as t (t.id)}
			<T.Group position={[t.x - 5, 0, t.z - 5]}>
				<FloorTile />
			</T.Group>
		{/each}
	{/each}

	<T.Group position={[-0.5, 1, -0.5]}>
		<AutoColliders shape="cuboid">
			<T.Mesh position={[5, 0, 0]}>
				<T.BoxGeometry args={[0.1, 2, 10]} />
				<T.MeshBasicMaterial color="beige" />
			</T.Mesh>
			<T.Mesh position={[0, 0, 5]}>
				<T.BoxGeometry args={[10, 2, 0.1]} />
				<T.MeshBasicMaterial color="beige" />
			</T.Mesh>
			<T.Mesh position={[-5, 0, 0]}>
				<T.BoxGeometry args={[0.1, 2, 10]} />
				<T.MeshBasicMaterial color="beige" />
			</T.Mesh>
			<T.Mesh position={[0, 0, -5]}>
				<T.BoxGeometry args={[10, 2, 0.1]} />
				<T.MeshBasicMaterial color="beige" />
			</T.Mesh>
		</AutoColliders>
	</T.Group>
	<T.Group position={[0, 0.5, 0]}>
		{#each Object.keys(kitchenItems) as t (t)}
			{@const d = kitchenItems[t]}
			{@const Comp = appliances[d.type]}
			<T.Group position={[d.position.x, 0, d.position.y]}>
				<Comp id={t} />
			</T.Group>
		{/each}
	</T.Group>
</T.Group>
