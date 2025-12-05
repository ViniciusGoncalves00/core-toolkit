export class ShiftableStack<T> {
	private items: T[] = [];
    private readonly _capacity: number;

	public constructor(capacity: number) {
		this._capacity = capacity;
	}

	public push(item: T): void {
        if (this.items.length >= this._capacity) {
            this.items.shift();
		}
		this.items.push(item);
	}

	public pop(): T | undefined {
		return this.items.pop();
	}

	public peek(): T | undefined {
		return this.items[this.items.length - 1];
	}

	public size(): number {
		return this.items.length;
	}

	public isEmpty(): boolean {
		return this.items.length === 0;
	}

    public isFull(): boolean {
		return this.items.length === this._capacity;
	}

    public capacity(): number {
        return this._capacity;
    }

	public clear(): void {
		this.items.length = 0;
	}
}
