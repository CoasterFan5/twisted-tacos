<script lang="ts">
	import type { CarryableData } from '$lib/types/Carryable';
	import { T } from '@threlte/core';
	import { holdableModels } from './holdableItems';
	import TacoRenderer from './TacoRenderer.svelte';

	const {
		carryable
	}: {
		carryable: CarryableData;
	} = $props();

	const BaseItem = $derived(holdableModels[carryable.type]);
</script>

<T.Group>
	{#if BaseItem}
		{#if carryable.type == 'tacoShell'}
			<TacoRenderer tacoData={carryable} />
		{:else}
			<BaseItem></BaseItem>{/if}
	{/if}
	{#if carryable.children.tacoShell}
		<TacoRenderer tacoData={carryable.children.tacoShell} />
	{/if}
</T.Group>
