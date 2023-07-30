// test/copyBoard.test.ts

import { expect, it } from 'vitest';

function copyBoard(board) {

  // Deep copy each row
  return board.map(row => {  
    return row.map(cell => {
      return {...cell}; 
    });
  });

}

it('deep copies board', () => {

  const original = [
    [{symbol: 'X'}], 
    [{symbol: 'O'}]
  ];  

  const copy = copyBoard(original);

  // Modify nested cell
  copy[0][0].symbol = 'O'; 

  // Original is unchanged
  expect(original[0][0].symbol).toBe('X');

});