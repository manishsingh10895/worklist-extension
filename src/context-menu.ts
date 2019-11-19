import { Storage } from "./services/storage.service";

declare var chrome: any;

export function makeContextMenu() {

    chrome.contextMenus.create({
        title: 'Add to My worklist',
        contexts: ["page", "selection"]
    })

}

async function handleContextClick(e: any) {
    console.log(e);

    let worklists = await Storage.GetWorkArea();

    console.log(worklists);

    let url = e.pageUrl;

    if (e.selectionText) {

    }
}   