import React from 'react'
import { Drawer } from '@material-ui/core';

import NoteContainer from './NoteContainer';

function onClose(props: any) {


    return;
}

var documentListener = (props: any) => {
    props.onClose();
};

export default function NotesDrawer(props: any) {
    console.log(props);

    if (props.open) {
        document.body.addEventListener('click', documentListener.bind(null, props));
    } else {
        document.body.removeEventListener('click', documentListener);
    }

    return (
        <div >
            <NoteContainer></NoteContainer>
        </div>
    )
}
