import WorkList from "../models/list.model";
import { ENVIRONMENT } from "../config";
import { Note } from "../models/note.model";

declare var chrome: any;

export class Storage {
    static async SaveWorkArea(workLists: WorkList[]): Promise<any> {

        console.log("Storage.SaveWorkArea");
        console.log("Saving worklists");
        console.log(workLists);
        console.log(ENVIRONMENT);

        if (ENVIRONMENT == 'production') {
            return new Promise((resolve, reject) => {
                chrome.storage.sync.set({
                    'worklist': JSON.stringify(workLists)
                }, () => {
                    resolve();
                });
            });
        } else {
            await Promise.resolve();

            let lists = JSON.stringify(workLists);

            localStorage.setItem('worklists', lists);
        }
    }

    static async SaveNotes(notes: Note[]): Promise<void> {
        if (ENVIRONMENT == 'production') {
            return new Promise((resolve, reject) => {
                chrome.storage.sync.set({
                    'notes': JSON.stringify(notes)
                }, () => {
                    resolve();
                });
            });
        } else {
            await Promise.resolve();

            let lists = JSON.stringify(notes);

            localStorage.setItem('notes', lists);
        }
    }

    static async GetWorkArea(): Promise<WorkList[]> {
        if (ENVIRONMENT == 'production') {
            return new Promise((resolve, reject) => {
                chrome.storage.sync.get(['worklist'], (result: any) => {
                    if (result.worklist) {
                        return resolve(JSON.parse(result.worklist));
                    }

                    return resolve([]);
                });
            });
        } else {

            await Promise.resolve();

            let lists = localStorage.getItem('worklists');

            if (lists) {
                return JSON.parse(lists);
            }

            return [];
        }
    }

    static async  GetNotes(): Promise<Note[]> {
        if (ENVIRONMENT == 'production') {
            return new Promise((resolve, reject) => {
                chrome.storage.sync.get(['notes'], (result: any) => {
                    if (result.notes) {
                        return resolve(JSON.parse(result.notes));
                    }

                    return resolve([]);
                });
            });
        } else {

            await Promise.resolve();

            let lists = localStorage.getItem('notes');

            if (lists) {
                return JSON.parse(lists);
            }

            return [];
        }
    }


}