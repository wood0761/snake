const numCols = 5;
const numRows = 5;

function App() {
	const grid = [];

	for (let i = 0; i < numRows; i++) {
		grid.push(Array.from(Array(numCols), () => 0));
	}

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: `repeat(${numCols}, 30px)`,
			}}
		>
			{grid.map((rows, i) =>
				rows.map((cols, k) => {
					return (
						<div style={{ height: 30, width: 30, border: '1px solid black' }} />
					);
				})
			)}
		</div>
	);
}

export default App;