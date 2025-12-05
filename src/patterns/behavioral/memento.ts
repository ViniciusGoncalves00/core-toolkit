import { LimitedStack } from '../../datastructures/limitedStack.js';
import { Stack } from '../../datastructures/stack.js';

export interface IMementable<T> {
	save(): IMemento<T>;
	restore(memento: IMemento<T>): void;
}

export interface IMemento<T> {
	readonly data: T;
}

export class MementoKeeper<T> {
	private readonly object: IMementable<T>;
	private readonly historic: LimitedStack<IMemento<T>> | Stack<IMemento<T>>;
	private pointer: number;

	public constructor(object: IMementable<T>, size?: number) {
		this.object = object;

		if (size) {
			this.historic = new LimitedStack(size);
		} else {
			this.historic = new Stack();
		}

		this.pointer = -1;
	}

	public save(): void {
		const memento = this.object.save();

		if (this.historic instanceof LimitedStack) {
			if (this.historic.isFull()) return;
		}

		this.historic.push(memento);
		this.pointer++;
	}

	public restore(): void {
        if (this.pointer === -1) {
			console.warn('There are nothing to restore.');
			return;
		}
        
		const memento = this.historic.pop();
		this.object.restore(memento!);
		this.pointer--;
	}

    public stackType(): typeof LimitedStack | typeof Stack {
        if (this.historic instanceof LimitedStack) {
			return LimitedStack;
		} else if (this.historic instanceof Stack) {
            return Stack;
        } else {
            throw new Error("Was not possible to determine the stack type.");
        }
    }
}
