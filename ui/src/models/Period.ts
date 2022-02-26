export class Period {
    static LIMIT_LOWER = 1;

    static isValid(value: number): boolean {
        return (value >= this.LIMIT_LOWER);
    }
}