import {
  readMatrix,
  printGameTable,
  uniquePermutations,
  subMatrix,
  range,
  getXEquations,
  getYEquations,
  linearEquationSystemN,
  vN,
  zeroIndices,
  vDotProduct,
  mGetColumn,
  isProbability,
} from './utils.js'

const solveSubGame = (subGame, rows, cols, n, m, decimalPlaces = 2) => {
  try {
    const xEquations = getXEquations(subGame);
    const yEquations = getYEquations(subGame);

    const xSolution = linearEquationSystemN(xEquations, decimalPlaces);
    const ySolution = linearEquationSystemN(yEquations, decimalPlaces);

    const x = vN(n, 0);
    for (const i in rows) {
      x[rows[i]] = xSolution[i];
    }
    const xValue = xSolution[xSolution.length - 1];

    const y = vN(m, 0);
    for (const i in cols) {
      y[cols[i]] = ySolution[i];
    }
    const yValue = xSolution[xSolution.length - 1];

    return [x, y, xValue, yValue];
  } catch {
    return [null, null, null, null];
  }
}

const isOptimalSolution = (matrix, x, y, value) => (
  x && y &&
  x.every(isProbability) &&
  y.every(isProbability) &&
  zeroIndices(x).map(i => vDotProduct(y, matrix[i])).every(v => v < value) &&
  zeroIndices(y).map(i => vDotProduct(x, mGetColumn(matrix, i))).every(v => v > value)
);

const GREEN_TEXT_MODE = '\x1b[32m%s\x1b[0m';
const SHOULD_PRINT_NON_OPTIMAL = false;
const DECIMAL_PLACES = 5;

const matrix = readMatrix('matrix.txt');
printGameTable(matrix);

const n = matrix.length;
const m = matrix[0].length;

const sMax = Math.min(n, m);

for (const s of range(2, sMax + 1)) {
  const rowsPermutations = uniquePermutations(n, s);
  const colsPermutations = uniquePermutations(m, s);

  for (const rows of rowsPermutations) {
    for (const cols of colsPermutations) {
      const subGame = subMatrix(matrix, rows, cols);
      const [x, y, xValue, yValue] = solveSubGame(subGame, rows, cols, n, m, DECIMAL_PLACES);
      const isOptimal = isOptimalSolution(matrix, x, y, xValue);

      if (isOptimal || SHOULD_PRINT_NON_OPTIMAL) {
        printGameTable(subGame, rows, cols);
        console.log(`Value of X: ${xValue}, Value of Y: ${yValue}`);
        console.log('X =', x);
        console.log('Y =', y);
        if (isOptimal && SHOULD_PRINT_NON_OPTIMAL) {
          console.log(GREEN_TEXT_MODE, 'This solution is optimal!');
        }
        console.log('');
      }
    }
  }
}
