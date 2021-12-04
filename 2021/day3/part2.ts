const binaryData = Deno.readTextFileSync(new URL('input.txt', import.meta.url));
const binaryDataArray = binaryData.split('\n').filter(String);

console.log('Day 3, part 2:');
const oxygenGeneratorRating = getRating(binaryDataArray, 'oxygen');
const c02ScrubberRating = getRating(binaryDataArray, 'c02');

const lifeSupportRating = oxygenGeneratorRating * c02ScrubberRating;

// Submission notes:
// 1st try: answer 866761 is incorrect (too low)
//   reason: my most/least common bit criteria were the same
// 2nd try: answer 2935443 is incorrect (too high)
//   reason: I wasn't recalculating most/least common after each collection reduction
// 3rd try: answer 1662846 is correct
console.log({ lifeSupportRating });


// FUNCTION DEFINITIONS
type BitCounter = {
  '0': number;
  '1': number;
}
type Bit = keyof BitCounter;

function getRating(binaryDataArray: string[], ratingType: string) {

  const findQualifyingNumbers = (collection: string[], position: number): string => {
    if (collection.length <= 1) {
      console.log(`last remaining binary string: ${collection[0]}`)
      return collection[0];
    }

    // Recalculate the number of 0s and 1s in the current position
    const { '0': zeros, '1': ones } = collection.reduce((bitCounter: BitCounter, binaryString) => {
      const targetBit = binaryString.at(position) as Bit;
      bitCounter[targetBit]++;
      return bitCounter;
    }, { '0': 0, '1': 0 });

    let filterValue: string;

    switch (ratingType) {
      case 'oxygen':
        filterValue = ones >= zeros ? '1' : '0';
        break;
      case 'c02':
        filterValue = ones < zeros ? '1' : '0';
        break;
    }

    const filteredCollection = collection
      .filter(binaryString => binaryString.at(position) === filterValue);

    console.log(`Collection at digit ${position+1} has ${filteredCollection.length} items, and has ${ones} ones and ${zeros} zeros`);

    return findQualifyingNumbers(filteredCollection, position + 1);
  };

  const qualifyingNumber = findQualifyingNumbers(binaryDataArray, 0);

  return parseInt(qualifyingNumber, 2);
}
