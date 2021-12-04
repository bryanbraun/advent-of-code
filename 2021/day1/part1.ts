const sonarData = Deno.readTextFileSync(new URL('input.txt', import.meta.url));
const sonarDataArray = sonarData.split('\n').map(val => Number(val));
const increasingValueCount = sonarDataArray.reduce((prevValue, currValue, currIndex, array) => {
  if (currIndex === 0) return 0;

  return currValue > array[currIndex - 1] ? prevValue + 1 : prevValue; 
}, 0);

console.log(increasingValueCount);
