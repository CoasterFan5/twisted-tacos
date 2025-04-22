export const gameStats: GameStats = {
	dishesServed: 0,
	score: 0,
	highScore: 0, // 0 if false, 1 if true
	meatBurnt: 0
};

const statNames = ['dishesServed', 'score', 'highScore', 'meatBurnt'] as const;
type StatName = (typeof statNames)[number];
type GameStats = Record<StatName, number>;

export const setGameStats = () => {
	localStorage.setItem('gs', JSON.stringify(gameStats));
};

export const getGameStats = () => {
	const i = JSON.parse(localStorage.getItem('gs') || '{}');
	for (const s of statNames) {
		if (i[s]) {
			const v = parseInt(i[s]);
			if (!isNaN(v)) {
				gameStats[s] = v;
			}
		}
	}
	return gameStats;
};
