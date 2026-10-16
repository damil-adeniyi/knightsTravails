import "./styles.css";

function isValidMove(x, y) {
  return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

function getPossibleMoves(currentSquare) {
  const [x, y] = currentSquare;
  const possibleOffsets = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2]
  ];

  const validMoves = [];
  for (const offset of possibleOffsets) {
    const newX = x + offset[0];
    const newY = y + offset[1];
    if (isValidMove(newX, newY)) {
      validMoves.push([newX, newY]);
    }
  }
  return validMoves;
}

function knightMoves(start, end) {
  const queue = [[start]];
  const visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    const path = queue.shift();
    const currentSquare = path[path.length - 1];

    if (currentSquare[0] === end[0] && currentSquare[1] === end[1]) {
      // Format output string to precisely match The Odin Project requirement
      let result = `=> You made it in ${path.length - 1} moves! Here's your path:\n`;
      path.forEach(square => {
        result += `[${square[0]},${square[1]}]\n`;
      });
      console.log(result.trim());
      return path;
    }

    for (const nextSquare of getPossibleMoves(currentSquare)) {
      const squareString = nextSquare.toString();
      if (!visited.has(squareString)) {
        visited.add(squareString);
        queue.push([...path, nextSquare]);
      }
    }
  }
}

console.log(knightMoves([3,3],[4,3]));
