<script lang="ts">
	import type { CarryableData } from '$lib/types/Carryable';
	import { T } from '@threlte/core';
	import { holdableModels } from './holdableItems';

	const {
		carryable
	}: {
		carryable: CarryableData;
	} = $props();

	const BaseItem = $derived(holdableModels[carryable.type]);
</script>

<T.Group>
	{#if BaseItem}
		<BaseItem></BaseItem>
	{/if}
</T.Group>
