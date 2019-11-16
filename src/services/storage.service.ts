import WorkList from "../models/list.model";

declare var chrome: any;

export class Storage {
    static async SaveWorkArea(workLists: WorkList[]): Promise<any> {
        await Promise.resolve();

        let lists = JSON.stringify(workLists);

        localStorage.setItem('worklists', lists);
    }

    static async GetWorkArea(): Promise<WorkList[]> {
        await Promise.resolve();

        let lists = localStorage.getItem('worklists');

        if (lists) {
            return JSON.parse(lists);
        }

        return [];
    }


    // static async SaveWorkArea(workLists: WorkList[]): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         chrome.storage.sync.set({
    //             'worklist': JSON.stringify(workLists)
    //         }, () => {
    //             resolve();
    //         });
    //     });
    // }

    // static async GetWorkArea(): Promise<WorkList[]> {
    //     return new Promise((resolve, reject) => {
    //         chrome.storage.sync.get(['worklist'], (result: any) => {
    //             if (result.worklist) {
    //                 return resolve(JSON.parse(result.worklist));
    //             }

    //             return resolve([]);
    //         });
    //     });

    // }
}