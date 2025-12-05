import { ShiftableStack } from '../../datastructures/shiftableStack.js';

export interface IStatable<T> {
	save(): IState<T>;
	restore(state: IState<T>): void;
}

export interface IState<T> {
	readonly data: T;
}

export class StateHistoric<T> {
	private readonly object: IStatable<T>;
	private readonly states: ShiftableStack<IState<T>>;

	public constructor(object: IStatable<T>, capacity: number = 32) {
		this.object = object;
		this.states = new ShiftableStack(capacity);
	}

	public save(): void {
		const state = this.object.save();
		this.states.push(state);
	}

	public restore(): void {
		if (this.states.isEmpty()) {
			console.warn('There is nothing to restore.');
			return;
		}

		const state = this.states.pop()!;
		this.object.restore(state);
	}

	public clear(): void {
		this.states.clear();
	}

	public size(): number {
		return this.states.size();
	}

	public capacity(): number {
		return this.states.capacity();
	}
}
