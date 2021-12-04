const binaryData = Deno.readTextFileSync(new URL('input.txt', import.meta.url));
const binaryDataArray = binaryData.split('\n');
const binaryDataRowCount = binaryDataArray.length;

// Create an array the length of our binary data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// Each position in the bit1Counters array tracks the number of ones in that placeholder.
const bit1Counters = new Array(binaryDataArray[0].length).fill(0, 0);

for (let i = 0; i < binaryDataArray.length; i++) {
  for (let stringPos = 0; stringPos < binaryDataArray[i].length; stringPos++) {
    if (binaryDataArray[i].at(stringPos) === '1') {
      bit1Counters[stringPos] = bit1Counters[stringPos] + 1;
    }
  }
}

const gammaRateArray = bit1Counters
  .map(counter => (counter > (binaryDataRowCount - counter)) ? 1 : 0);
const epsilonRateArray = gammaRateArray
  .map(gammaRateValue => gammaRateValue === 1 ? 0 : 1);

const gammaRateDecimal = parseInt(gammaRateArray.join(''), 2);
const epsilonRateDecimal = parseInt(epsilonRateArray.join(''), 2);
const powerConsumption = gammaRateDecimal * epsilonRateDecimal;

console.log({ powerConsumption });
