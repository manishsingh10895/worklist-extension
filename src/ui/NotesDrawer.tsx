import React from 'react'
import { Drawer } from '@material-ui/core';

import NoteContainer from './NoteContainer';

function onClose(props: any) {
    return;
}

var documentListener = (e: MouseEvent, props: any) => {
    let drawer = document.querySelector('.notes-drawer') as HTMLElement;
    if (drawer.contains((e.target as HTMLElement))) {
        return;
    }

    props.onClose();
};

export default function NotesDrawer(props: any) {
    console.log(props);

    if (props.open) {
        document.body.addEventListener('click', (e) => documentListener(e, props));
    } else {
        document.body.removeEventListener('click', (e) => documentListener(e, props));
    }

    return (
        <div className="notes-drawer">
            <NoteContainer isOpen={props.open} ></NoteContainer>
        </div>
    )
}
