<script>
	import { tutorialData } from '$lib/sharedState.svelte';

	const tutorialStages = [
		stage0,
		stage1,
		stage2,
		stage3,
		stage4,
		stage5,
		stage6,
		stage7,
		stage8,
		stage9,
		end
	];
</script>

{#snippet end()}
	<p>Tutorial Complete!</p>
{/snippet}

{#snippet stage0()}
	<p>Use WASD to move</p>
	<p>Use E to pickup and place</p>
	<p>Try picking up the tomato</p>
{/snippet}
{#snippet stage1()}
	<p>Great!</p>
	<p>Place the tomato back on counter with E</p>
	<p>Now, interact and cut it up with Q</p>
{/snippet}
{#snippet stage2()}
	<p>Epic!</p>
	<p>Head to the spinner.</p>
	<p>Spin it with Q</p>
{/snippet}
{#snippet stage3()}
	<p>Nice!</p>
	<p>Pick up the item from the spinner.</p>
	<p>Rember, E is pickup and place</p>
{/snippet}
{#snippet stage4()}
	<p>Wow!</p>
	<p>Grab the meat from the counter.</p>
	<p>Place it on the stove.</p>
{/snippet}
{#snippet stage5()}
	<p>Amazing!</p>
	<p>Allow it to cook.</p>
	<p>Place cooked meat into a taco shell</p>
{/snippet}
{#snippet stage6()}
	<p>Increadible!</p>
	<p>Grab the cut tomato.</p>
	<p>Place it onto the taco</p>
{/snippet}
{#snippet stage7()}
	<p>Superb!</p>
	<p>Grab a plate.</p>
	<p>Put it on a counter.</p>
	<p>Place the taco on the plate</p>
{/snippet}
{#snippet stage8()}
	<p>Almost done!</p>
	<p>Serve Taco at the conveyor.</p>
{/snippet}
{#snippet stage9()}
	<p>Complete!</p>
	<p>Tutorial Complete!</p>
{/snippet}

<div class="dayInfo">
	<h2>Tutorial</h2>
	{@render tutorialStages[tutorialData.stage]()}
	{#if tutorialData.stage < tutorialData.maxAllowedStage}
		<p>Move on with right arrow</p>
	{/if}
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
