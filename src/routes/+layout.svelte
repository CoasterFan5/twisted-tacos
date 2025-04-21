<script>
	const { children } = $props();
	import '@fontsource-variable/caveat';
</script>

{@render children?.()}

<style>
	:global(body) {
		margin: 0;
		height: 100%;
		width: 100%;
		overflow-x: hidden;
	}

	:global(*) {
		box-sizing: border-box;
		font-family: 'Caveat Variable', cursive;
	}
</style>
