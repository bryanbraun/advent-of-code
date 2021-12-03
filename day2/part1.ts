const instructions = Deno.readTextFileSync(new URL('input.txt', import.meta.url));
const instructionsArray = instructions.split('\n');
let depth = 0;
let horizontalPosition = 0;

instructionsArray.forEach(instruction => {
  const [direction, quantity] = instruction.split(' ');

  switch (direction) {
    case 'forward':
      horizontalPosition += Number(quantity);
      break;
    case 'down':
      depth += Number(quantity);
      break;
    case 'up':
      depth -= Number(quantity);
      break;
  }
});

console.log({depth, horizontalPosition}, `total: ${depth * horizontalPosition}`);
