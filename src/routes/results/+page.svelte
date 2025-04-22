<script lang="ts">
	import { getGameStats } from '$lib/components/gameStats';

	const s = $state(getGameStats());

	const playAgain = () => {
		window.location.href = '/play';
	};
</script>

<div class="wrap">
	<div class="statsCard">
		<h2>Game Over!</h2>
		<h3>Results:</h3>
		<div>Score: {s.score}</div>
		<div>High Score: {s.highScore}</div>
		<div>Meat Burnt: {s.meatBurnt}</div>
		<div>Dishes Served: {s.dishesServed}</div>
		<a class="button" href="##" onclick={playAgain}>Play Again</a>
	</div>
</div>

<style lang="scss">
	.wrap {
		background: beige;
		height: 100vh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.statsCard {
		display: flex;
		flex-direction: column;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 1px 1px 3px 3px rgba(0, 0, 0, 0.2);

		h2 {
			margin: 0;
		}

		h3 {
			margin-top: 0.25rem;
			margin-bottom: 0.25rem;
		}
	}

	.button {
		display: flex;
		background: lightblue;
		color: black;
		font-size: 1rem;
		padding: 0.5rem;
		min-width: 10rem;
		margin-top: 1rem;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
	}
</style>
