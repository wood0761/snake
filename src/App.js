import { useState, useEffect } from 'react';
import { useInterval } from './tools/useInterval';

const numCols = 20;
const numRows = 10;

const getRandomCoords = () => {
	return [
		Math.floor(Math.random() * numRows),
		Math.floor(Math.random() * numCols),
	];
};

const arrayEquality = (a, b) => {
	return a.every((val, index) => val === b[index]);
};

const checkAteYourself = (a, b) => {
	return b.some(array => arrayEquality(a, array));
};

function App() {
	const gridConstant = [];
	for (let i = 0; i < numRows; i++) {
		gridConstant.push(Array(numCols).fill(0));
	}
	const [snake, setSnake] = useState([[0, 0]]);
	const [direction, setDirection] = useState('RIGHT');
	const [grid, setGrid] = useState(gridConstant);
	const [food, setFood] = useState(getRandomCoords);
	const [paused, setPaused] = useState(true);
	const [delay, setDelay] = useState(200);
	const [score, setScore] = useState(0);

	const moveSnake = () => {
		const newSnake = [...snake];

		if (direction === 'RIGHT') {
			newSnake.forEach((piece, index) => {
				if (index === 0) {
					if (piece[1] === numCols - 1) {
						piece = [piece[0], 0];
					} else {
						piece = [piece[0], piece[1] + 1];
					}
					newSnake.unshift(piece);
				}
			});
		}
		if (direction === 'LEFT') {
			newSnake.forEach((piece, index) => {
				if (index === 0) {
					if (piece[1] === 0) {
						piece = [piece[0], numCols - 1];
					} else {
						piece = [piece[0], piece[1] - 1];
					}
					newSnake.unshift(piece);
				}
			});
		}
		if (direction === 'UP') {
			newSnake.forEach((piece, index) => {
				if (index === 0) {
					if (piece[0] === 0) {
						piece = [numRows - 1, piece[1]];
					} else {
						piece = [piece[0] - 1, piece[1]];
					}
					newSnake.unshift(piece);
				}
			});
		}
		if (direction === 'DOWN') {
			newSnake.forEach((piece, index) => {
				if (index === 0) {
					if (piece[0] === numRows - 1) {
						piece = [0, piece[1]];
					} else {
						piece = [piece[0] + 1, piece[1]];
					}
					newSnake.unshift(piece);
				}
			});
		}

		if (!arrayEquality(newSnake[0], food)) {
			newSnake.pop();
		} else {
			setFood(getRandomCoords);
			setDelay(delay * 0.95);
			setScore(score + 1);
		}
		const newGrid = [...gridConstant];
		newSnake.forEach(piece => {
			newGrid[piece[0]][piece[1]] = 1;
		});

		if (checkAteYourself(newSnake[0], newSnake.slice(1))) {
			setPaused(true);
		}

		newGrid[food[0]][food[1]] = 1;
		setSnake(newSnake);
		setGrid(newGrid);
	};

	useInterval(
		() => {
			moveSnake();
		},
		paused ? null : delay
	);

	const handleKeydown = event => {
		switch (event.keyCode) {
			case 37:
				if (direction !== 'RIGHT') {
					setDirection('LEFT');
				}
				break;
			case 38:
				if (direction !== 'DOWN') {
					setDirection('UP');
				}
				break;
			case 39:
				if (direction !== 'LEFT') {
					setDirection('RIGHT');
				}
				break;
			case 40:
				if (direction !== 'UP') {
					setDirection('DOWN');
				}
				break;
			default:
				setDirection('RIGHT');
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});

	return (
		<>
			<button onClick={() => setPaused(!paused)}>
				{paused ? 'PLAY' : 'PAUSE'}
			</button>
			SCORE: {score}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat(${numCols}, 30px)`,
					justifyContent: 'center',
				}}
			>
				{grid.map((rows, i) =>
					rows.map((cols, k) => {
						return (
							<div
								style={{
									height: 30,
									width: 30,
									border: '1px solid black',
									background: grid[i][k] ? 'black' : null,
								}}
							/>
						);
					})
				)}
			</div>
		</>
	);
}

export default App;
