<script lang="ts">
	import '@fontsource/luckiest-guy';
</script>

<div class="wrap">
	<h1>Lucky Tacos</h1>
	<a class="button" href="/play">Play</a>
	<a class="button" href="/tutorial">Tutorial</a>
	<a class="button" href="/credits">Credits</a>
</div>

<style lang="scss">
	* {
		font-family: 'Luckiest Guy', system-ui;
	}

	.wrap {
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: beige;
		gap: 0.5rem;
	}

	h1 {
		font-size: 4rem;
	}

	.button {
		display: flex;
		padding-top: 1.5rem;
		padding-bottom: 1rem;
		background: lightblue;
		color: black;
		min-width: 20rem;
		font-size: 2rem;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
	}
</style>
