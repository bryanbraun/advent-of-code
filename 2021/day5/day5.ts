export function getOverlappingHorizontalAndVerticalLinesCount(textInput: string): number {
  const fullSegmentData = parseInput(textInput);
  const validSegmentData = fullSegmentData.filter(segment => (
    segment.start[0] === segment.end[0] || segment.start[1] === segment.end[1]
  ));
  const maxX = validSegmentData.reduce((previousValue, currentValue) => {
    const segmentMaxX = currentValue.start[0] > currentValue.end[0] ? currentValue.start[0] : currentValue.end[0];
    return previousValue > segmentMaxX ? previousValue : segmentMaxX;
  }, 0);
  const maxY = validSegmentData.reduce((previousValue, currentValue) => {
    const segmentMaxY = currentValue.start[1] > currentValue.end[1] ? currentValue.start[1] : currentValue.end[1];
    return previousValue > segmentMaxY ? previousValue : segmentMaxY;
  }, 0);

  let map = drawEmptyMap(maxX, maxY);
  map = drawLinesOnMap(map, validSegmentData);

  return scoreMap(map);
}

export function getOverlappingLinesCount(textInput: string): number {
  const segmentData = parseInput(textInput);

  const maxX = segmentData.reduce((previousValue, currentValue) => {
    const segmentMaxX = currentValue.start[0] > currentValue.end[0] ? currentValue.start[0] : currentValue.end[0];
    return previousValue > segmentMaxX ? previousValue : segmentMaxX;
  }, 0);
  const maxY = segmentData.reduce((previousValue, currentValue) => {
    const segmentMaxY = currentValue.start[1] > currentValue.end[1] ? currentValue.start[1] : currentValue.end[1];
    return previousValue > segmentMaxY ? previousValue : segmentMaxY;
  }, 0);

  let map = drawEmptyMap(maxX, maxY);
  map = drawLinesOnMap(map, segmentData);

  return scoreMap(map);
}


type Map = number[][];
type Segment = {
  start: number[];
  end: number[];
}

function parseInput(textInput: string) {
  return textInput
    .split('\n')
    .filter(String)
    .map((textLine: string) => {
      const textPoints = textLine.split(' -> ');
      return {
        start: textPoints[0].split(',').map(val => Number(val)),
        end: textPoints[1].split(',').map(val => Number(val)),
      }
    });
}

function drawEmptyMap(maxX: number, maxY: number): Map {
  let map = [];

  for (let y = 0; y <= maxY; y++) {
    map[y] = [] as number[];
    for (let x = 0; x <= maxX; x++) {
      map[y][x] = 0;
    }
  }
  return map;
}

function drawLinesOnMap(map: Map, segmentData: Segment[]): Map {
  for (let segment of segmentData) {
    let pointSeries = getLinePointsFromEndpoints(segment);
    for (let point of pointSeries) {
      map[point[1]][point[0]] += 1;
    }
  }

  return map;
}

function getLinePointsFromEndpoints(segment: Segment): number[][] {
  const [xDifference, yDifference] = [segment.start[0] - segment.end[0], segment.start[1] - segment.end[1]];
  const isVertical = xDifference === 0;
  const isHorizontal = yDifference === 0;

  let linePoints: number[][],
      lineXPoints: number[],
      lineYPoints: number[];

  const walkTheLine = (start: number, end: number) => {
    const stepValues = [];
    for (let i = start; i <= end; i++) {
      stepValues.push(i);
    }
    return stepValues;
  }

  if (isVertical) {
    if (segment.start[1] < segment.end[1]) { // forwards
      linePoints = walkTheLine(segment.start[1], segment.end[1]).map(val => [segment.start[0], val]);
    } else { // backwards
      linePoints = walkTheLine(segment.end[1], segment.start[1]).map(val => [segment.start[0], val]);
    }
  } else if (isHorizontal) {
    if (segment.start[0] < segment.end[0]) { // forwards
      linePoints = walkTheLine(segment.start[0], segment.end[0]).map(val => [val, segment.start[1]]);
    } else { // backwards
      linePoints = walkTheLine(segment.end[0], segment.start[0]).map(val => [val, segment.start[1]]);
    }
  } else { // It's diagonal!
    if (segment.start[0] < segment.end[0]) { // xForwards
      lineXPoints = walkTheLine(segment.start[0], segment.end[0]);
    } else { // xBackwards
      lineXPoints = walkTheLine(segment.end[0], segment.start[0]).reverse();
    }
    if (segment.start[1] < segment.end[1]) { // yForwards
      lineYPoints = walkTheLine(segment.start[1], segment.end[1]);
    } else { // yBackwards
      lineYPoints = walkTheLine(segment.end[1], segment.start[1]).reverse();
    }

    linePoints = lineXPoints.map((xPoint, index) => [xPoint, lineYPoints[index]]);
  }

  return linePoints;
}

function scoreMap(map: Map): number {
  let score = 0;
  for (let row of map) {
    for (let space of row) {
      if (space >= 2) {
        score++;
      }
    }
  }
  return score;
}
