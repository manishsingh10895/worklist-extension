import React, { Component } from 'react'

import '../drawer.css';

interface NoteContainerState {
    noteText: string
}

export default class NoteContainer extends Component<any, NoteContainerState> {

    state = {
        noteText: ''
    }

    render() {
        return (
            <div style={{ display: 'flex', height: '100%' }}>
                <textarea style={{ width: '100%' }} rows={10} onChange={(e) => this.state.noteText = e.target.value}>

                </textarea>
            </div>
        )
    }
}
