export default function (numbers: number[]): number {
  if (numbers.length === 0) {
    return 0;
  }

  const sortedNumbers: Array<number> = numbers.sort((a, b) => a - b);

  if (sortedNumbers.length % 2 === 0) {
    const a = sortedNumbers[Math.floor(sortedNumbers.length / 2) - 1] || 0;
    const b = sortedNumbers[Math.floor(sortedNumbers.length / 2)] || 0;
    return (a + b) / 2;
  } else {
    return sortedNumbers[Math.floor(sortedNumbers.length / 2)] || 0;
  }
}