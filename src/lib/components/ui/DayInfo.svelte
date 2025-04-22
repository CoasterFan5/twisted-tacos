<script>
	import { playerData } from '$lib/sharedState.svelte';
	import { days } from '../days/dayList';
	import { goto } from '$app/navigation';
	import { gameStats, setGameStats } from '$lib/components/gameStats';

	const dayInfo = $derived(days[playerData.dayNumber]);

	const timeLeft = $derived(dayInfo.minutes * 60 - playerData.timeInDay);
	$effect(() => {
		if (timeLeft <= 0) {
			gameStats.score = playerData.balance;
			gameStats.highScore = playerData.highScore;
			gameStats.meatBurnt = playerData.meatBurn;
			gameStats.dishesServed = playerData.dishesServed;

			setGameStats();
			goto('/results');
		}
	});
</script>

<div class="dayInfo">
	<h2>Lucky Tacos</h2>
	<p class:urgent={timeLeft < 30}>Time Left: {timeLeft.toFixed(0)}s</p>
	<p>Highscore: ${playerData.highScore}</p>
	<p>Balace: ${playerData.balance.toLocaleString('en-US')}</p>
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

	.urgent {
		animation: u 1s infinite ease-in-out;
	}

	@keyframes u {
		0% {
			scale: 1;
			color: black;
		}
		50% {
			scale: 1.2;
			color: red;
		}
		100% {
			scale: 1;
			color: black;
		}
	}
</style>
