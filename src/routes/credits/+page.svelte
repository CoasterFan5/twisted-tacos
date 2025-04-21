<script lang="ts">
	import '@fontsource/luckiest-guy';
</script>

<div class="wrap">
	<h1>Credits</h1>
	<h2>Created By</h2>
	<div class="creditText">Dylan Myers</div>
	<h2>Tested By</h2>
	<div class="creditText">Dylan Myers</div>
	<h2>Assets</h2>
	<div class="creditText">Kenny.nl</div>
	<a class="button" href="/">Back</a>
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
		justify-content: start;
		background: beige;
		gap: 0.5rem;
		padding: 1rem;
	}

	h1 {
		font-size: 4rem;
	}

	h2 {
		margin: 0;
		font-size: 2rem;
	}

	.button {
		margin-top: 5rem;
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

	.creditText {
		font-family: sans-serif;
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
</style>
