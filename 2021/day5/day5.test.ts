import { assertEquals } from 'https://deno.land/std@0.117.0/testing/asserts.ts';
import { getOverlappingHorizontalAndVerticalLinesCount, getOverlappingLinesCount } from './day5.ts';

const exampleLineSegmentData = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;


Deno.test('Day5 part 1 example horizontal and vertical overlap count is correct', () => {
  assertEquals(getOverlappingHorizontalAndVerticalLinesCount(exampleLineSegmentData), 5);
});

Deno.test("Day5 part 1 horizontal and vertical overlap count is correct", () => {
  const correctAnswer = 8350;
  const lineSegmentData = Deno.readTextFileSync(new URL('input.txt', import.meta.url));
  assertEquals(getOverlappingHorizontalAndVerticalLinesCount(lineSegmentData), correctAnswer);
});

Deno.test('Day5 part 1 example overlap count is correct', () => {
  assertEquals(getOverlappingLinesCount(exampleLineSegmentData), 12);
});

Deno.test("Day5 part 1 overlap count is correct", () => {
  const correctAnswer = 19374;
  const lineSegmentData = Deno.readTextFileSync(new URL('input.txt', import.meta.url));
  assertEquals(getOverlappingLinesCount(lineSegmentData), correctAnswer);
});
