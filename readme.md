## Game Solver
Solves mathematical games using Shapley-Snow method

## Prerequirements
- node v20.*

## How to use
- fill in matrix data into [`matrix.txt`](matrix.txt) file, located in this directory
- run the following command in terminal `node .\shapley-snow.js`
- you can change `SHOULD_PRINT_NON_OPTIMAL` and `DECIMAL_PLACES` constants in [`shapley-snow.js`](shapley-snow.js) file.
When `SHOULD_PRINT_NON_OPTIMAL` is `true`, you'll see all subgames which indepentently has solution, and the games which
solutions satisfy all the constraints (i.e. are optimal) will be marked corresponding.
When `SHOULD_PRINT_NON_OPTIMAL` is `false`, you'll see only games which solution is optimal.
`DECIMAL_PLACES` is a number of digits after comma, you want to see in the solution
