<script>
	import { playerData } from '$lib/sharedState.svelte';
</script>

<div class="dayInfo">
	<h2>Day 1</h2>
	<p>Due Today: $10</p>
	<p>Balance: ${playerData.balance.toLocaleString('en-US')}</p>
</div>

<style lang="scss">
	.dayInfo {
		padding: 1rem;
		background: #fdfdc9;
		display: flex;
		flex-direction: column;
		rotate: 1deg;

		h2 {
			margin: 0px;
		}

		p {
			font-size: 1.2rem;
			margin: 0;
		}
	}
</style>
