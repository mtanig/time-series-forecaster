export class ConfidenceInterval {
    static LIMIT_LOWER = 1;
    static LIMIT_UPPER = 100;

    static isValid(value: number) {
        return (value >= this.LIMIT_LOWER && value <= this.LIMIT_UPPER);
    }
}