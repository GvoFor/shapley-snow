import fs from 'fs';
import { mNxM, vN, mTranspose } from 'mz-math'
import { PrettyTable } from 'prettytable.js';

const range = (a, b) => vN(b - a).map((_, i) => a + i);

const readMatrix = (filename) => {
  return fs.readFileSync(filename, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((row) => row.split(' ').map(Number));
};

const readExpandedMatrix = (filename) => {
  const expanded = fs.readFileSync(filename, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((row) => row.split(' ').map(Number));

  const matrix = expanded.map(row => row.slice(0, row.length - 1));
  const vector = expanded.flatMap(row => row[row.length - 1]);

  return [matrix, vector];
};

const printMatrix = (matrix) => {
  if (!matrix) {
    console.log(matrix);
    return;
  }

  const table = new PrettyTable();
  table.addRows(matrix);
  console.log(table.toString());
}

const printGameTable = (matrix, rows = [], cols = []) => {
  if (!matrix) {
    console.log(matrix);
    return;
  }

  const n = matrix.length;
  const m = matrix[0].length;

  if (!rows.length) {
    rows = range(0, n);
  }

  if (!cols.length) {
    cols = range(0, m);
  }

  const table = new PrettyTable();
  table.setHeader(['', ...vN(m).map((_, i) => `B${cols[i]+1}`)])
  table.addRows(matrix.map((row, i) => [`A${rows[i]+1}`, ...row]));

  console.log(table.toString());
}

const subMatrix = (matrix, rows, cols) => {
  const N = matrix.length;
  const M = matrix[0].length;
  const n = rows.length;
  const m = cols.length;

  if (n > N || m > M) {
    return null;
  }

  const subMatrix = mNxM(n, m);
  for (const i in rows) {
    for (const j in cols) {
      const row = rows[i];
      const col = cols[j];
      subMatrix[i][j] = matrix[row][col];
    }
  }

  return subMatrix;
}

const uniquePermutations = (n, s, accumulator = [], indices = []) => {
  if (s === 0) {
    return [...accumulator, indices];
  }

  for (let i = indices.length ? indices[indices.length - 1] + 1 : 0; i < n; i++) {
    accumulator = uniquePermutations(n, s - 1, accumulator, [...indices, i]);
  }

  return accumulator;
};

const getXEquations = (matrix) =>
  mTranspose(matrix)
   .map((column) => [...column, -1, 0])
   .concat([[...vN(matrix.length, 1), 0, 1]]);

const getYEquations = (matrix) =>
  matrix
   .map((row) => [...row, -1, 0])
   .concat([[...vN(matrix[0].length, 1), 0, 1]]);

const isProbability = (x) => x >= 0 && x <= 1;

const isNotNull = (x) => x !== null;

const zeroIndices = (arr) => arr
  .map((v, i) => v === 0 ? i : null)
  .filter(isNotNull)

export {
  readMatrix,
  readExpandedMatrix,
  subMatrix,
  printMatrix,
  printGameTable,
  uniquePermutations,
  range,
  getXEquations,
  getYEquations,
  isProbability,
  zeroIndices,
};

export {
  vN,
  linearEquationSystemN,
  vDotProduct,
  mGetColumn,
} from 'mz-math';
