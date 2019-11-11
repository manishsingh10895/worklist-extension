import uuid from 'uuid';

export default class Task {
    id: string;
    title: string;
    completed?: boolean;
    isCheckedItem: boolean = false;

    constructor(title: string, isCheckedItem: boolean) {
        this.id = uuid.v1();
        this.title = title;
        this.isCheckedItem = isCheckedItem;

        if (!this.isCheckedItem)
            this.completed = false;
    }
}