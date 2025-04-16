<script lang="ts">
	import { T } from '@threlte/core';
	import FloorTile from './FloorTile.svelte';

	const tiles: {
		id: number;
		x: number;
		z: number;
		item: undefined;
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

	console.log(tiles);
</script>

<T.Group position={[0, -0.5, 0]}>
	{#each tiles as row (row)}
		{#each row as t (t.id)}
			<T.Group position={[t.x - 5 + 0.5, 0, t.z - 5 + 0.5]}>
				<FloorTile />
			</T.Group>
		{/each}
	{/each}
</T.Group>
