<script lang="ts">
	import { orders } from '$lib/sharedState.svelte';
	import DayInfo from './DayInfo.svelte';
	import Holding from './Holding.svelte';
	import OrderInfo from './OrderInfo.svelte';
	import Tutorial from './Tutorial.svelte';

	const {
		tutorialMode
	}: {
		tutorialMode?: boolean;
	} = $props();
</script>

<Holding />

<div class="overlay">
	<div class="left">
		{#if !tutorialMode}
			<DayInfo />
			{#each orders as order, i (order.id)}
				<OrderInfo index={i} orderInfo={order} />{/each}
		{:else}
			<Tutorial />
		{/if}
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0px;
		top: 0px;
		display: flex;
		z-index: 100;
		align-items: start;
		justify-content: start;
		padding: 1rem;
	}

	.left {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100vh;
		overflow-y: auto;
		-ms-overflow-style: none; /* Internet Explorer 10+ */
		scrollbar-width: none; /* Firefox */
		padding-bottom: 3rem;
	}
</style>
