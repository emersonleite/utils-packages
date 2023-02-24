export function getElementIndex(list: number[], item: number) {
  let downLimit = 0;
  let upLimit = list.length - 1;

  while (downLimit <= upLimit) {
    let middle = Math.floor((downLimit + upLimit) / 2);
    let hint = list[middle];

    if (hint === item) {
      return middle;
    }
    if (hint > item) {
      upLimit = middle - 1;
    } else {
      downLimit = middle + 1;
    }
  }
  return -1;
}

export abstract class BinarySearch {
  public limitNumberOfAttempts: number = 0;
  public numberOfAttemps: number = 0;
  public numericValueInputted: number = 0;

  constructor(protected bottomLimit: number, protected topLimit: number) {
    this.getNumberOfAttemps();
  }

  protected getNumberOfAttemps() {
    this.limitNumberOfAttempts = Math.ceil(
      Math.log2(this.topLimit - this.bottomLimit)
    );
  }

  public abstract decrease(): void;

  public abstract increase(): void;

  public abstract get valueDiscovered(): string;
}

export class BinarySearchByControl extends BinarySearch {
  private middleValue: number = 0;
  public guessedNumber: number = 0;

  constructor(bottomLimit: number, topLimit: number) {
    super(bottomLimit, topLimit);

    this.getMiddleValue();
  }

  private getMiddleValue() {
    this.middleValue = Math.floor((this.bottomLimit + this.topLimit) / 2);
  }

  public decrease() {
    this.topLimit = this.middleValue + 1;
    this.numberOfAttemps++;
    this.getMiddleValue();
  }

  public increase() {
    this.bottomLimit = this.middleValue - 1;
    this.numberOfAttemps++;
    this.getMiddleValue();
  }

  public isEquals() {
    this.guessedNumber = this.middleValue;
  }

  public get valueDiscovered() {
    return this.guessedNumber === this.middleValue ? "equals" : "";
  }
}

export class BinarySearchByInputValue extends BinarySearch {
  public randomNumber: number = 0;

  constructor(bottomLimit: number, topLimit: number) {
    super(bottomLimit, topLimit);
    this.getNumberOfAttemps();
    this.getRandomNumber();
  }

  public getRandomNumber() {
    this.randomNumber = Math.floor(
      Math.random() * (this.topLimit - this.bottomLimit) + this.bottomLimit
    );
  }

  decrease() {
    this.topLimit = this.numericValueInputted - 1;
    this.numberOfAttemps++;
  }

  increase() {
    this.bottomLimit = this.numericValueInputted + 1;
    this.numberOfAttemps++;
  }

  setNumericValueInputted(numericValueInputted: number) {
    this.numericValueInputted = numericValueInputted;
    if (this.numericValueInputted > this.randomNumber) {
      this.decrease();
    } else {
      this.increase();
    }
  }

  public get valueDiscovered() {
    if (this.numericValueInputted === this.randomNumber) {
      return "equals";
    }
    if (this.numericValueInputted > this.randomNumber) {
      return "smaller";
    } else {
      return "bigger";
    }
  }
}
