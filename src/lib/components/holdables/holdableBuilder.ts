import type { Carryable, CarryableData } from '$lib/types/Carryable';

export const holdableBuilder: (type: Carryable) => CarryableData = (type) => {
	return {
		type: type,
		children: {}
	};
};
