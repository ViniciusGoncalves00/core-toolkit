import { ShiftableStack } from '../datastructures/shiftableStack.js';
import { IStatable, IState } from '../patterns/behavioral/memento.js';

export class UndoRedo<T> {
	private readonly object: IStatable<T>;
	private readonly undoStates: ShiftableStack<IState<T>>;
	private readonly redoStates: ShiftableStack<IState<T>>;

	public constructor(object: IStatable<T>, capacity: number = 4) {
		this.object = object;

		this.undoStates = new ShiftableStack(capacity);
		this.redoStates = new ShiftableStack(capacity);
	}

	public save(): void {
		const state = this.object.save();
		this.undoStates.push(state);

        this.redoStates.clear();
	}

	public undo(): void {
		if (this.undoStates.isEmpty()) {
			console.warn('There are nothing to undo.');
			return;
		}

		const currentState = this.object.save();
		this.redoStates.push(currentState);

		const previousState = this.undoStates.pop()!;
		this.object.restore(previousState);
	}

	public redo(): void {
		if (this.redoStates.isEmpty()) {
			console.warn('There are nothing to redo.');
			return;
		}

		const currentState = this.object.save();
		this.redoStates.push(currentState);

		const previousState = this.undoStates.pop()!;
		this.object.restore(previousState);
	}

	public clear(): void {
		this.undoStates.clear();
		this.redoStates.clear();
	}

    public undoSize(): number {
		return this.undoStates.size();
	}

	public redoSize(): number {
		return this.redoStates.size();
	}
}
