import { ShiftableStack } from '../datastructures/shiftableStack.js';
import { IStatable, IState } from '../patterns/behavioral/memento.js';

export class doundo<T> {
	private readonly object: IStatable<T>;
	private readonly undoStates: ShiftableStack<IState<T>>;
	private readonly redoStates: ShiftableStack<IState<T>>;
	private undoPointer: number;
	private redoPointer: number;

	public constructor(object: IStatable<T>, capacity: number = 4) {
		this.object = object;

	    this.undoStates = new ShiftableStack(capacity);
	    this.redoStates = new ShiftableStack(capacity);

		this.undoPointer = -1;
		this.redoPointer = -1;
	}

	public save(): void {
		const state = this.object.save();
		this.undoStates.push(state);
		this.undoPointer++;
	}

    public undo(): void {
		if (this.undoPointer === -1) {
			console.warn('There are nothing to undo.');
			return;
		}

        const currentState = this.object.save();
        this.redoStates.push(currentState);
        this.redoPointer++;

		const previousState = this.undoStates.pop();
		this.object.restore(previousState!);
		this.undoPointer--;
    }

    public redo(): void {
		if (this.redoPointer === -1) {
			console.warn('There are nothing to redo.');
			return;
		}

        const state = this.redoStates.pop();
		this.object.restore(state!);
		this.redoPointer--;

        this.undoStates.push(state!);
        this.undoPointer++;
    }

    public clear(): void {
        this.undoStates.clear();
        this.redoStates.clear();

        this.undoPointer = -1;
		this.redoPointer = -1;
    }
}
