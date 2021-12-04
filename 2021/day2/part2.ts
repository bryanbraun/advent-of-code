const instructions = Deno.readTextFileSync(new URL('input.txt', import.meta.url));
const instructionsArray = instructions.split('\n');
let depth = 0;
let horizontalPosition = 0;
let aim = 0;

instructionsArray.forEach(instruction => {
  const [direction, quantity] = instruction.split(' ');

  switch (direction) {
    case 'forward':
      horizontalPosition += Number(quantity);
      depth += (aim * Number(quantity));
      break;
    case 'down':
      aim += Number(quantity);
      break;
    case 'up':
      aim -= Number(quantity);
      break;
  }
});

console.log({depth, horizontalPosition}, `total: ${depth * horizontalPosition}`);
