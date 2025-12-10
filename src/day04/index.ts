import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const rows = rawInput.split('\n');
  const table = rows.map(row => row.split(''));

  return table;
};

const getNeighbours = (grid: string[][], row: number, col: number) => {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const neighbours: string[] = [];

  for (const [dRow, dCol] of directions) {
    const newRow = row + dRow;
    const newCol = col + dCol;

    const isValidRow = newRow >= 0 && newRow < grid.length;
    const isValidCol = isValidRow && newCol >= 0 && newCol < grid[newRow].length;

    if (isValidRow && isValidCol) {
      const val = grid[newRow][newCol];
      neighbours.push(val);
    }
  }

  return neighbours;
}

const part1 = (rawInput: string) => {
  const table = parseInput(rawInput);
  let countOfAccessibleRolls = 0;
  for (let r = 0; r < table.length; r++) {
    for (let c = 0; c < table[0].length; c++) {
      if (table[r][c] === '@' && getNeighbours(table, r, c).filter(a => a === '@').length < 4) {
        countOfAccessibleRolls++;
      }
    }
  }

  return countOfAccessibleRolls;
};

const part2 = (rawInput: string) => {
  const table = parseInput(rawInput);
  let countOfAccessibleRolls = 0;
  let changesMadeLastTime = false; 

  do {
    changesMadeLastTime = false;
    let changesThisTime = 0;
    for (let r = 0; r < table.length; r++) {
      for (let c = 0; c < table[0].length; c++) {
        if (table[r][c] === '@' && getNeighbours(table, r, c).filter(a => a === '@').length < 4) {
          table[r][c] = 'x';
          countOfAccessibleRolls++;
          changesThisTime++
        }
      }
    }

    if (changesThisTime) {
      changesMadeLastTime = true;
    }

  } while (changesMadeLastTime)

  return countOfAccessibleRolls;
};

run({
  part1: {
    tests: [
      {
        input: `..@@.@@@@.\n@@@.@.@.@@\n@@@@@.@.@@\n@.@@@@..@.\n@@.@@@@.@@\n.@@@@@@@.@\n.@.@.@.@@@\n@.@@@.@@@@\n.@@@@@@@@.\n@.@.@@@.@.`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `..@@.@@@@.\n@@@.@.@.@@\n@@@@@.@.@@\n@.@@@@..@.\n@@.@@@@.@@\n.@@@@@@@.@\n.@.@.@.@@@\n@.@@@.@@@@\n.@@@@@@@@.\n@.@.@@@.@.`,
        expected: 43,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
