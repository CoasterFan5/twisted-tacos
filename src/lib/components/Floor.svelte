<script lang="ts">
	import { T } from '@threlte/core';
	import FloorTile from './FloorTile.svelte';
	import Stove from './Stove.svelte';
	import Fridge from './Fridge.svelte';
	import { kitchen } from '../../routes/play/sharedState.svelte';
	import Counter from './Counter.svelte';

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

<T.Group position={[0, -0.5, 0]}>
	{#each tiles as row (row)}
		{#each row as t (t.id)}
			<T.Group position={[t.x - 5, 0, t.z - 5]}>
				<FloorTile />
			</T.Group>
		{/each}
	{/each}
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
	</T.Group>
</T.Group>
