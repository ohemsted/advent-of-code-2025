import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const instructions: { direction: string; count: number }[] = [];
  rawInput.split(`\n`).forEach((instruction) => {
    const direction = instruction.slice(0, 1);
    const count = parseInt(instruction.substring(1, instruction.length), 10);
    instructions.push({direction, count})
  })
  
  return instructions;
}
  

const part1 = (rawInput: string) => {
  const instructions = parseInput(rawInput);

  let countOfZeroes = 0;
  let currentLocation = 50;
  
  instructions.forEach((instruction) => {
    if (instruction.direction == 'L') {
      currentLocation -= instruction.count;
    } else {
      currentLocation += instruction.count;
    }

    // If it's more than 100 we're just going round in circles
    currentLocation = currentLocation % 100; 

    if (currentLocation < 0) {
      currentLocation = 100 + currentLocation;
    } else if (currentLocation > 99) {
      currentLocation = currentLocation - 100;
    } 
    
    if (currentLocation == 0) {
      countOfZeroes++;
    }
  });

  return countOfZeroes;
};

const part2 = (rawInput: string) => { 
  const instructions = parseInput(rawInput);

  let countOfZeroes = 0;
  let currentLocation = 50;
  
  instructions.forEach((instruction) => {
    let start = currentLocation;
    
    // How many times do we just go around in circles
    countOfZeroes += Math.floor(instruction.count / 100);

    let remainder = instruction.count % 100;

    if (instruction.direction == 'L') {
      let target = start - instruction.count;

      if (start > 0 && (start - remainder) <= 0) {
          countOfZeroes++;
      } 
      
      currentLocation = target % 100;
      
      if (currentLocation < 0) {
        currentLocation += 100;
      }
    } else { 
      let target = start + instruction.count;
      let distToZero = 100 - start;

      if (start !== 0 && remainder >= distToZero) {
          countOfZeroes++;
      } 

      currentLocation = target % 100;
    }
  });

  return countOfZeroes;
};

run({
  part1: {
    tests: [
      {
        input: `L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82`,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82`,
        expected: 6,
      },
      {
        input: `L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL182`,
        expected: 7,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
