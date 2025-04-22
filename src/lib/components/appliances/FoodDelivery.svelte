<script lang="ts">
	import { Collider } from '@threlte/rapier';
	import Conveyor from './Conveyor.svelte';
	import { T } from '@threlte/core';
	import { registerEListener, unregisterEListener } from '$lib/keyManager';
	import type { RigidBodyUserData } from '$lib/types/RigidBodyUserData';
	import { orders, playerData } from '$lib/sharedState.svelte';
	import { holdableBuilder } from '../holdables/holdableBuilder';

	const {
		id
	}: {
		id: string;
	} = $props();

	const placeFood = () => {
		const deliveredFood = playerData.carrying;
		playerData.carrying = holdableBuilder('air');

		// check its on a plate
		if (deliveredFood.type != 'plate') {
			console.warn('No plate');
			return;
		}

		// check the plate has a taco
		const tacoChild = deliveredFood.children.tacoShell;
		if (!tacoChild) {
			console.warn('NO taco ');
			return;
		}

		// loop through each order and find the first match
		for (const [index, o] of orders.entries()) {
			console.log($state.snapshot(o));
			console.log($state.snapshot(tacoChild));
			//tomatoe
			const tacoHasTomatoe = tacoChild.children.slicedTomato != undefined;
			const orderHasTomato = o.req.slicedTomato;
			if (orderHasTomato != tacoHasTomatoe) {
				console.log('No Tomato Match');
				continue;
			}

			//lettuce

			const tacoHasLettuce = tacoChild.children.lettuceSlice != undefined;
			const orderHasLettuce = o.req.lettuceSlice;
			if (orderHasLettuce != tacoHasLettuce) {
				console.log('No Lettuce Match');
				continue;
			}

			// cheese
			const tacoHasCheese = tacoChild.children.cutCheese != undefined;
			const orderHasCheese = o.req.cutCheese;

			if (orderHasCheese != tacoHasCheese) {
				console.log('No Cheese Match');
				continue;
			}

			// Onion
			const tacoHasOnion = tacoChild.children.cutOnion != undefined;
			const orderHasOnion = o.req.cutOnion;

			if (orderHasOnion != tacoHasOnion) {
				console.log('No Onion Match');
				continue;
			}

			playerData.balance = Math.floor(playerData.balance + 5 + Math.random() * 5);
			console.info('Order matched!');
			orders.splice(index, 1);
			return;
		}
	};

	let active = $state(false);
</script>

<Collider
	shape="cuboid"
	args={[0.5, 1, 0.5]}
	oncollisionenter={(e) => {
		if ((e.targetRigidBody?.userData as RigidBodyUserData).name == 'player') {
			registerEListener(id, placeFood);
			active = true;
		}
	}}
	oncollisionexit={(e) => {
		if ((e.targetRigidBody?.userData as RigidBodyUserData).name == 'player') {
			unregisterEListener(id);
			active = false;
		}
	}}
>
	<T.Group position={[0, -0.2, 0]}>
		<T.Group>
			<T.Mesh position={[0, 0.6, -0.499]}>
				<T.BoxGeometry args={[1, 1, 0.1]} />
				<T.MeshBasicMaterial color="black" />
			</T.Mesh>
		</T.Group>
		<T.Group position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
			<Conveyor />
		</T.Group>
		{#if active}
			<T.Mesh position={[0, 0.25, 0]}>
				<T.BoxGeometry args={[1.01, 0.5, 1.01]} />
				<T.MeshBasicMaterial color="white" opacity={0.5} transparent={true} />
			</T.Mesh>{/if}
	</T.Group>
</Collider>
