import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let totalJoltage = 0;
  for (const line of input) {
    let maxNumber = 0;
    let maxSecondNumber = 0

    const numbersExceptLast = line.slice(0, line.length - 1);
    for (const numStr of numbersExceptLast) {
      const num = parseInt(numStr, 10);
      if (num > maxNumber) {
        maxNumber = num;
      }
    }

    const indexOfBigNumber = line.indexOf(`${maxNumber}`)

    for (const numStr of line.slice(indexOfBigNumber + 1, line.length)) {
      const num = parseInt(numStr, 10);
      if (num > maxSecondNumber) {
        maxSecondNumber = num;
      }
    }

    totalJoltage += parseInt(`${maxNumber}${maxSecondNumber}`, 10);
  }

  return totalJoltage;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const DIGITS_NEEDED = 12;
  let totalJoltage = 0;

  for (const line of input) {
    let dropCount = line.length - DIGITS_NEEDED;
    const stack = [];

    for (const digit of line) {
      while (dropCount > 0 && stack.length > 0 && stack[stack.length - 1] < digit) {
        // Keep the bigger number and drop the smallest
        stack.pop(); 
        dropCount--; 
      }
      stack.push(digit);
    }

    const resultDigits = stack.slice(0, DIGITS_NEEDED);
    const resultNumber = parseInt(resultDigits.join(""), 10);

    totalJoltage += resultNumber;
  }

  return totalJoltage;
};

run({
  part1: {
    tests: [
      {
        input: `987654321111111\n811111111111119\n34234234234278\n818181911112111`,
        expected: 357,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `987654321111111\n811111111111119\n34234234234278\n818181911112111`,
        expected: 3121910778619,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
