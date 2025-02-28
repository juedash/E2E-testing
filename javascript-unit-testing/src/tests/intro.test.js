import { describe, test, it, expect } from "vitest";
import { calculateAverage, fizzBuzz, max, factorail } from "../intro";

describe("max", () => {
  it("should return the first argument if it is greater", () => {
    //AAA - Arrange - Act - Assert
    //Arrange
    // const a = 2; //we may need to do it and skip the arrange
    // const b = 1;
    // //Act
    // const result = max(a, b);
    // //Assert
    // expect(result).toBe(2);
    expect(max(2, 1)).toBe(2);
  });
  it("should return the second argument if it is greater", () => {
    expect(max(1, 2)).toBe(2);
  });

  it("should return the first argument if it is greater", () => {
    expect(max(2, 2)).toBe(2);
  });
});

describe("fuzzbuzz", () => {
  it("should return FizzBuzz", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });
  it("should return Fizz", () => {
    expect(fizzBuzz(6)).toBe("Fizz");
  });

  it("should return Buzz", () => {
    expect(fizzBuzz(20)).toBe("Buzz");
  });

  it("should return argument as a string when its not divisible by niether 3 or 5", () => {
    expect(fizzBuzz(1)).toBe("1");
  });
});

describe("calculate average", () => {
  it("should return NaN if given an empty array", () => {
    expect(calculateAverage([])).toBe(NaN);
  });

  it("should calculate the average with a single element", () => {
    expect(calculateAverage([1])).toBe(1);
  });

  it("shouldshould calculate the average with two elements", () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });
  it("shouldshould calculate the average with three elements", () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
  });
});

describe("factorial", () => {
  it("should return 1", () => {
    expect(factorail(0)).toBe(1);
  });
  it("should return factorial", () => {
    expect(factorail(3)).toBe(6);
  });

  it("should return undefined when the value is negative", () => {
    // expect(factorail(-1)).toBe(undefined);
    expect(factorail(-1)).toBeUndefined;
  });
});
