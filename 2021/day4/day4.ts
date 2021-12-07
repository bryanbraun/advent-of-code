export function findBingoScoreForFirstWinningCard(inputString: string): number {
  let bingoData = parseBingoData(inputString);

  for (let callIndex = 0; callIndex < bingoData.callNumbers.length; callIndex++) {
    bingoData = callNumber(bingoData, callIndex);

    for (let boardIndex = 0; boardIndex < bingoData.boardsData.length; boardIndex++) {
      if (isWinningBoard(bingoData, boardIndex)) {
        return scoreBingoBoard(bingoData, boardIndex, callIndex);
      };
    }
  }

  return 0; // After all numbers were called, no boards won.
}


export function findBingoScoreForLastWinningCard(inputString: string) {
  let bingoData = parseBingoData(inputString);
  let unsuccessfulBoards = new Array(bingoData.boardsData.length).fill(0).map((_, index) => index);

  for (let callIndex = 0; callIndex < bingoData.callNumbers.length; callIndex++) {
    bingoData = callNumber(bingoData, callIndex);

    for (let boardIndex = 0; boardIndex < unsuccessfulBoards.length; boardIndex++) {
      if (isWinningBoard(bingoData, unsuccessfulBoards[boardIndex])) {
        if (unsuccessfulBoards.length === 1) {
          return scoreBingoBoard(bingoData, unsuccessfulBoards[boardIndex], callIndex);
        }

        unsuccessfulBoards.splice(boardIndex, 1)
      };
    }
  }

  return 0; // After all numbers were called, no boards won.
}

// FUNCTION DEFINITIONS

type BingoData = {
  callNumbers: number[];
  boardsData: BoardData[];
};

type BoardData = {
  board: Board;
  markers: boolean[][];
}

type Board = number[][];

function parseBingoData(inputString: string): BingoData {
  const dataItems = inputString.split('\n\n');

  const callNumbersText = dataItems.shift() || '';
  const callNumbers = callNumbersText.split(',').map(numeral => Number(numeral));

  const parseBoard = (textBoard: string) => {
    const textRows = textBoard.split('\n').filter(String);
    return textRows.map(textRow => (
      textRow.split(' ').filter(String).map(numeral => Number(numeral))
    ));
  };

  const boardsData = dataItems.map(board => ({
    board: parseBoard(board),
    markers: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false]
    ]
  }));

  return {
    callNumbers,
    boardsData,
  };
}

function callNumber(bingoData: BingoData, callIndex: number): BingoData {
  const calledNumber = bingoData.callNumbers[callIndex];

  for (let boardIndex = 0; boardIndex < bingoData.boardsData.length; boardIndex++) {
    for (let rowIndex = 0; rowIndex < bingoData.boardsData[boardIndex].board.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < bingoData.boardsData[boardIndex].board[rowIndex].length; columnIndex++) {
        if (calledNumber === bingoData.boardsData[boardIndex].board[rowIndex][columnIndex]) {
          bingoData.boardsData[boardIndex].markers[rowIndex][columnIndex] = true;
        }
      }
    }
  };

  return bingoData;
}

function isWinningBoard(bingoData: BingoData, boardIndex: number): boolean {
  const hasRowWin = (board: boolean[][]) => {
    for (let row = 0; row < board.length; row++) {
      if (board[row].every(space => space)) {
        return true;
      }
    }
    return false;
  };
  const hasColumnWin = (board: boolean[][]) => {
    for (let column = 0; column < board[0].length; column++) {
      let consecutiveMarkers = 0;

      for (let row = 0; row < board.length; row++) {
        if (board[row][column]) {
          consecutiveMarkers += 1;
        } else {
          break;
        }
      }

      if (consecutiveMarkers === 5) {
        return true;
      }
    };
    return false;
  }

  if (hasRowWin(bingoData.boardsData[boardIndex].markers) || hasColumnWin(bingoData.boardsData[boardIndex].markers)) {
    return true;
  } else {
    return false;
  }
}

function scoreBingoBoard(bingoData: BingoData, boardIndex: number, callIndex: number): number {
  let winningBoard = bingoData.boardsData[boardIndex].board;
  let winningBoardMarkers = bingoData.boardsData[boardIndex].markers;
  let runningScore = 0;

  for (var rowIndex = 0; rowIndex < winningBoardMarkers.length; rowIndex++) {
    for (var columnIndex = 0; columnIndex < winningBoardMarkers[rowIndex].length; columnIndex++) {
      if (winningBoardMarkers[rowIndex][columnIndex] === false) {
        runningScore += winningBoard[rowIndex][columnIndex];
      }
    }
  }

  return runningScore * bingoData.callNumbers[callIndex];
}
