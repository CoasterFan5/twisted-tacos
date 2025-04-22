import { applianceBuilder } from '$lib/components/appliances/applianceBuilder';
import { holdableBuilder } from '$lib/components/holdables/holdableBuilder';
import { Vector2 } from 'three';

export const kitchenLayout = {
	a: applianceBuilder.counter({
		position: new Vector2(4, 4),
		holding: holdableBuilder('tomato')
	}),

	b: applianceBuilder.counter({
		position: new Vector2(4, 3),
		holding: holdableBuilder('air')
	})
};
