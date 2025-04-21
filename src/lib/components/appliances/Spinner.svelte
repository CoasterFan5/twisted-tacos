<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import SpinnerSlice from './SpinnerSlice.svelte';
	import type { Carryable } from '$lib/types/Carryable';
	import HoldableRender from '../holdables/HoldableRender.svelte';
	import { holdableBuilder } from '../holdables/holdableBuilder';
	import { Collider } from '@threlte/rapier';
	import {
		registerEListener,
		registerInteractListener,
		unregisterEListener,
		unRegisterInteractListener
	} from '$lib/keyManager';
	import type { RigidBodyUserData } from '$lib/types/RigidBodyUserData';
	import { playerData } from '$lib/sharedState.svelte';

	const spinnerIgredients: Carryable[] = [
		'meat',
		'tacoShell',
		'tomato',
		'lettuce',
		'lettuce',
		'lettuce'
	];

	const {
		id
	}: {
		id: string;
	} = $props();

	let spinVelocity = 0;
	let pos = $state(0);

	let spunIngredient = $state(spinnerIgredients[0]);

	useTask((deltaTime) => {
		pos += spinVelocity * deltaTime;
		spinVelocity = Math.max(spinVelocity - 5 * deltaTime, 0);
		if (spinVelocity == 0) {
			const dist = pos;
			const thisSpinDist = dist % (2 * Math.PI);
			const quad = thisSpinDist / (Math.PI / 3);
			const rawVisualIndex = Math.floor((-thisSpinDist / (Math.PI / 3)) % 6);
			const visualIndex = rawVisualIndex < 0 ? rawVisualIndex + 6 : rawVisualIndex;
			const visualSixth = visualIndex + 1;
			console.log(dist, quad, visualSixth);
			spunIngredient = spinnerIgredients[visualSixth - 1];
		}
	});

	const pickup = () => {
		if (playerData.carrying.type == 'air') {
			playerData.carrying = holdableBuilder(spunIngredient);
		}
	};

	const spinnnnn = () => {
		if (spinVelocity != 0) {
			return;
		}
		pos = 0;
		spinVelocity = 25 + Math.random() * 10;
	};
</script>

<T.Group position={[-0.5, 0, 0.5]}>
	<Collider
		shape="cuboid"
		args={[1, 0.5, 1]}
		oncollisionenter={(e) => {
			if ((e.targetRigidBody?.userData as RigidBodyUserData).name == 'player') {
				registerInteractListener(id, spinnnnn);
				registerEListener(id, pickup);
			}
		}}
		oncollisionexit={(e) => {
			if ((e.targetRigidBody?.userData as RigidBodyUserData).name == 'player') {
				unRegisterInteractListener(id);
				unregisterEListener(id);
			}
		}}
	>
		<T.Group rotation={[0, Math.PI / 6, 0]}>
			<T.Mesh position={[0, -0.21, 0]}>
				<T.CylinderGeometry args={[1, 1, 0.4]} />
				<T.MeshBasicMaterial color="black" />
			</T.Mesh>
			<T.Group scale={1} rotation={[0, pos, 0]}>
				{#each spinnerIgredients as ing, i (i)}
					<T.Group rotation={[0, (i * Math.PI) / 3, 0]}>
						<SpinnerSlice color={i % 2 == 0 ? 'gray' : 'white'} />
						<T.Group position={[0, 0.1, 0.65]} scale={0.5}>
							<HoldableRender carryable={holdableBuilder(ing)} />
						</T.Group>
					</T.Group>
				{/each}
			</T.Group>
			<T.Group rotation={[0, -Math.PI / 6, 0]}>
				<T.Mesh position={[0, 0, 1]}>
					<T.BoxGeometry args={[0.1, 0.1, 0.2]} />
					<T.MeshBasicMaterial color="red" />
				</T.Mesh>
			</T.Group>
			<T.Group scale={1} position={[0, 0, 0]}>
				<T.Mesh>
					<T.CylinderGeometry args={[0.4, 0.4, 0.2]} />
					<T.MeshBasicMaterial color="black" />
				</T.Mesh>
				<T.Group scale={0.5} position={[0, 0.1, 0]}>
					<HoldableRender carryable={holdableBuilder(spunIngredient)} />
				</T.Group>
			</T.Group>
		</T.Group>
	</Collider>
</T.Group>
