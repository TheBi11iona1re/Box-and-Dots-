import { expect, it } from 'vitest';

function createBoard(size) {
    return Array(size).fill().map((_, i) => 
      Array(size).fill().map((_, j) => ({  
        id: `cell-${i}-${j}`,
        symbol: ''
      }))
    );
  }
  
  it('creates empty board', () => {
    const board = createBoard(3);
    expect(board).toEqual([
      [{id: 'cell-0-0', symbol: ''}, {id: 'cell-0-1', symbol: ''}, {id: 'cell-0-2', symbol: ''}],
      [{id: 'cell-1-0', symbol: ''}, {id: 'cell-1-1', symbol: ''}, {id: 'cell-1-2', symbol: ''}],
      [{id: 'cell-2-0', symbol: ''}, {id: 'cell-2-1', symbol: ''}, {id: 'cell-2-2', symbol: ''}]
    ]);
  });