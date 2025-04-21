<script>
	import { playerData } from '$lib/sharedState.svelte';
	import { days } from '../days/dayList';

	const dayInfo = $derived(days[playerData.dayNumber]);
</script>

<div class="dayInfo">
	<h2>Day {playerData.dayNumber.toFixed(0)}</h2>
	<p>Ends in: {(dayInfo.minutes * 60 - playerData.timeInDay).toFixed(0)}s</p>
	<p>Due Today: {dayInfo.requiredMoney}</p>
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
