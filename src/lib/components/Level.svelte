<script lang="ts">
	import { T } from '@threlte/core';
	import FloorTile from './FloorTile.svelte';
	import Stove from './Stove.svelte';
	import Fridge from './Fridge.svelte';
	import { kitchen } from '../../routes/play/sharedState.svelte';
	import Counter from './Counter.svelte';
	import TrashCan from './TrashCan.svelte';
	import { AutoColliders } from '@threlte/rapier';
	import { Sky } from '@threlte/extras';
	import Tomatoes from './Tomatoes.svelte';

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
		{#each Object.keys(kitchen.fridges) as o (o)}
			{@const data = kitchen.fridges[o]}
			<T.Group position={[data.position.x, 0, data.position.y]}>
				<Fridge id={o} />
			</T.Group>
		{/each}
		{#each Object.keys(kitchen.counters) as o (o)}
			{@const data = kitchen.counters[o]}
			<T.Group position={[data.position.x, 0, data.position.y]}>
				<Counter id={o} />
			</T.Group>
		{/each}
		{#each Object.keys(kitchen.stoves) as o (o)}
			{@const data = kitchen.stoves[o]}
			<T.Group position={[data.position.x, 0, data.position.y]}>
				<Stove id={o} />
			</T.Group>
		{/each}
		{#each Object.keys(kitchen.trashCans) as o (o)}
			{@const data = kitchen.trashCans[o]}
			<T.Group position={[data.position.x, 0, data.position.y]}>
				<TrashCan id={o} />
			</T.Group>
		{/each}
		{#each Object.keys(kitchen.tomatoes) as o (o)}
			{@const data = kitchen.tomatoes[o]}
			<T.Group position={[data.position.x, 0, data.position.y]}>
				<Tomatoes id={o} />
			</T.Group>
		{/each}
	</T.Group>
</T.Group>
