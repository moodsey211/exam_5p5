import median from '../../logic/median';

describe('Testing the median function', () => {
  it('should handle empty array', () => {
    const numbers: number[] = [];
    const result: number = median(numbers);

    expect(result).toBe(0);
  });

  it('should handle an odd number of elements', () => {
    const numbers: number[] = [2400, 1200, 50, 150, 50];
    const result: number = median(numbers);

    expect(result).toBe(150);
  });

  it('should handle an even number of elements', () => {
    const numbers: number[] = [2400, 1200, 50, 150, 50, 100];
    const result: number = median(numbers);

    expect(result).toBe(125);
  });
});