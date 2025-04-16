import * as rapierCore from '@threlte/rapier';

export const r = typeof window !== 'undefined' ? rapierCore : (rapierCore as typeof rapierCore);
