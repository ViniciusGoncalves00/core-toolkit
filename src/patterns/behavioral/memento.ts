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
	private pointer: number;
	private _capacity: number;

	public constructor(object: IStatable<T>, capacity: number = 4) {
        this.object = object;
		this._capacity = capacity;
        
		this.states = new ShiftableStack(capacity);
		this.pointer = -1;
	}

	public save(): void {
		const state = this.object.save();
		this.states.push(state);
		this.pointer++;
	}

	public restore(): void {
		if (this.pointer === -1) {
			console.warn('There are nothing to restore.');
			return;
		}

		const state = this.states.pop();
		this.object.restore(state!);
		this.pointer--;
	}

    public capacity(): number {
        return this._capacity;
    }
}
