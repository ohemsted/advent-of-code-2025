import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const fillRange = (start: number, end: number) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }

  return rawInput.split(',').map(item => {
    const splits = item.split('-');
    return {
      start: parseInt(splits[0]),
      end: parseInt(splits[1]),
      range: fillRange(parseInt(splits[0]), parseInt(splits[1]))
    }
  });  
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const hasRepeatPatterns = (str: string) => {
    return str.substring(0, str.length / 2) === str.substring(str.length / 2, str.length) 
  }
  let total = 0;
  input.forEach(data => {
    data.range.forEach(d => {
      if (hasRepeatPatterns(d.toString())) {
        console.log(`Every element has a repeated pattern: ${d}`);
        total += d;
      }
    })
  })

  return total;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const hasRepeatPatterns = (str: string) => {
    return /^(\d+)(?:\1)+$/.test(str);
  }
  let total = 0;
  input.forEach(data => {
    data.range.forEach(d => {
      if (hasRepeatPatterns(d.toString())) {
        console.log(`Every element has a repeated pattern: ${d}`);
        total += d;
      }
    })
  })

  return total;
};

run({
  part1: {
    tests: [
      {
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
        expected: 1227775554,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
        expected: 4174379265,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
