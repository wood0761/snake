import { useState } from 'react';
import { useInterval } from './tools/useInterval';

const numCols = 5;
const numRows = 5;

function App() {
	const gridConstant = [];
	for (let i = 0; i < numRows; i++) {
		gridConstant.push(Array(numCols).fill(0));
	}
	const [snake, setSnake] = useState([[0, 0]]);
	const [grid, setGrid] = useState(gridConstant);

	const moveSnake = () => {
		// MOVING RIGHT
		const newSnake = [...snake];
		newSnake.forEach(piece => {
			piece = [piece[0], piece[1] + 1];
			newSnake.unshift(piece);
		});
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
