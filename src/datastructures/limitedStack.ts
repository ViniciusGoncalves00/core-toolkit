export class LimitedStack<T> {
	private items: T[] = [];
	public readonly capacity: number;

	public constructor(capacity: number) {
		this.capacity = capacity;
	}

	public push(item: T): void {
		if (this.items.length >= this.capacity) {
			console.warn(
				'It was not possible to push the item. The stack has reached its maximum capacity.'
			);
			return;
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
		return this.items.length === this.capacity;
	}

	public clear(): void {
		this.items.length = 0;
	}
}
