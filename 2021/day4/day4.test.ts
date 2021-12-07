import { assertEquals } from 'https://deno.land/std@0.117.0/testing/asserts.ts';
import { findBingoScoreForFirstWinningCard, findBingoScoreForLastWinningCard } from './day4.ts';

const testBingoData = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;

Deno.test("Day4 part1 example bingo score is correct", () => {
  assertEquals(findBingoScoreForFirstWinningCard(testBingoData), 4512);
});

Deno.test("Day4 part1 bingo score is correct", () => {
  const correctAnswer = 41503;
  const bingoData = Deno.readTextFileSync(new URL('input.txt', import.meta.url));
  assertEquals(findBingoScoreForFirstWinningCard(bingoData), correctAnswer);
})

Deno.test("Day4 part2 example bingo score is correct", () => {
  assertEquals(findBingoScoreForLastWinningCard(testBingoData), 1924);
})

Deno.test("Day4 part2 bingo score is correct", () => {
  const correctAnswer = 3178;
  const bingoData = Deno.readTextFileSync(new URL('input.txt', import.meta.url));
  assertEquals(findBingoScoreForLastWinningCard(bingoData), correctAnswer);
})
