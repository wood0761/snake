import { useState, useEffect } from 'react';
import { useInterval } from './tools/useInterval';

const numCols = 5;
const numRows = 5;

function App() {
	const gridConstant = [];
	for (let i = 0; i < numRows; i++) {
		gridConstant.push(Array(numCols).fill(0));
	}
	const [snake, setSnake] = useState([[0, 0]]);
	const [direction, setDirection] = useState('RIGHT');
	const [grid, setGrid] = useState(gridConstant);

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
				}
				newSnake.unshift(piece);
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
				}
				newSnake.unshift(piece);
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
				}
				newSnake.unshift(piece);
			});
		}

		newSnake.pop();
		const newGrid = [...gridConstant];
		newSnake.forEach(piece => {
			newGrid[piece[0]][piece[1]] = 1;
		});
		setSnake(newSnake);
		setGrid(newGrid);
	};

	useInterval(() => {
		moveSnake();
	}, 1000);

	const handleKeydown = event => {
		switch (event.keyCode) {
			case 37:
				setDirection('LEFT');
				break;
			case 38:
				setDirection('UP');
				break;
			case 39:
				setDirection('RIGHT');
				break;
			case 40:
				setDirection('DOWN');
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
	);
}

export default App;
