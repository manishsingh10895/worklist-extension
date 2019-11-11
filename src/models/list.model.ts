import Task from "./task.model";

import { v1 } from 'uuid';

export default class WorkList {

    id: string;

    public list: Task[] = [];


    constructor(public title: string, public isChecklist: boolean = false) {
        this.id = v1();
    }

    findById(id: string): Task | undefined {
        return this.list.find((el) => el.id == id);
    }

    addItem(item: Task) {
        this.list.push(item);
    }

    removeItem(item: Task | undefined) {
        console.warn("Worklist remove called on empty data");
        if (!item) return;

        let i = this.list.findIndex((el) => el.id == item.id);

        this.removeItemAtIndex(i);
    }

    removeItemAtIndex(index: number) {
        this.list = this.list.splice(index, 1);
    }

    updateItem(id: string, item: Task) {
        let _item = this.findById(id);

        if (_item) {
            _item.id = item.id;
            _item.completed = item.completed;
            _item.isCheckedItem = item.isCheckedItem;
            _item.title = item.title;
        }
    }
}