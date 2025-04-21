<script lang="ts">
	import type { orders } from '$lib/sharedState.svelte';

	const partyNumber = Math.floor(Math.random() * 100);

	const {
		orderInfo,
		index
	}: {
		orderInfo: (typeof orders)[number];
		index: number;
	} = $props();

	const rotateAmount = index % 2 == 0 ? -1 : 1;

	const betterNames: Partial<Record<string, string>> = {
		cookedMeat: 'Beef',
		lettuceSlice: 'Lettuce',
		slicedTomato: 'Tomato'
	};
</script>

<div class="dayInfo" style="rotate: {rotateAmount}deg">
	<h2>Ticket #{partyNumber}</h2>
	<p>Taco With:</p>
	{#each Object.keys(orderInfo.req) as k (k)}
		<p>{betterNames[k] || 'Mystery'}</p>
	{/each}
</div>

<style lang="scss">
	.dayInfo {
		padding: 1rem;
		background: #fdfdc9;
		display: flex;
		flex-direction: column;

		h2 {
			margin: 0px;
		}

		p {
			font-size: 1.2rem;
			margin: 0;
		}
	}
</style>
