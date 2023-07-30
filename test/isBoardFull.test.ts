// test.ts
import { expect, it } from 'vitest';

function isBoardFull(board: string[][]) {
  return board.every(row => row.every(cell => cell !== '')); 
}

it('determines if board is full', () => {
  const board = [
    ['X', 'O', 'X'],
    ['X', 'O', 'O'], 
    ['O', 'X', 'O']
  ];

  expect(isBoardFull(board)).toBe(true);
  
  const notFullBoard = [
    ['X', 'O', 'X'], 
    ['X', '', '']
  ];

  expect(isBoardFull(notFullBoard)).toBe(false);
});