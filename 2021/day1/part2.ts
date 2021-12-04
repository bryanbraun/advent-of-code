const sonarData = Deno.readTextFileSync(new URL('input.txt', import.meta.url));
const sonarDataArray = sonarData.split('\n').map(val => Number(val));

let increasingDepthCount = 0;

sonarDataArray.forEach((value, index, array) => {
  if (index < 3) return;

  const previousDepthSum = array[index - 3] + array[index - 2] + array[index - 1];
  const currentDepthSum = array[index - 2] + array[index - 1] + value;

  if (currentDepthSum > previousDepthSum) {
    increasingDepthCount += 1;
  }
});

console.log(increasingDepthCount);
