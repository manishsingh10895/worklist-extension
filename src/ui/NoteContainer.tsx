import React, { Component } from 'react'

import '../drawer.css';
import { Storage } from '../services/storage.service';


interface NoteContainerState {
    noteText: string,
    updateMessage: string
}

interface NoteContainerProps {
    isOpen: boolean
}

export default class NoteContainer extends Component<NoteContainerProps, NoteContainerState> {

    state = {
        noteText: '',
        updateMessage: ''
    }

    noteSaveInterval: any;

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevProps.isOpen != this.props.isOpen) {

            if (this.props.isOpen) {
                this.startNoteSaving();
            }

            else {
                this.stopNoteSaving();
                this.saveNotes();
            }
        }

        if (this.state.noteText != prevState.noteText) {
            this.setState({
                updateMessage: 'changes'
            })
        }
    }

    componentDidMount() {
        if (this.props.isOpen) {
            this.startNoteSaving();
        }

        this.syncNotes();
    }


    /**
     * Fetches previously saved notes from chrome storage and 
     * sets in the state
     */
    async syncNotes() {
        let notes = await Storage.GetNotes();

        if (notes && notes.length > 0) {
            this.setState({
                noteText: notes[0].note
            })
        }
    }

    async saveNotes() {
        this.setState({
            updateMessage: 'saving'
        })
        await Storage.SaveNotes([{ note: this.state.noteText }])
        this.setState({
            updateMessage: 'saved'
        })
    }

    startNoteSaving() {
        this.noteSaveInterval = setInterval(async () => {
            this.saveNotes();

            console.log("Notes saved");
        }, 2500);
    }

    stopNoteSaving() {
        if (this.noteSaveInterval) {
            clearInterval(this.noteSaveInterval);
        }
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>


                <div className="title"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '5px 10px',
                        backgroundColor: '#3f51b5',
                        textAlign: 'center',
                        fontSize: '20px',
                        color: 'white',
                    }}
                >
                    <div>Notes</div>

                    <div className="icon" style={{
                        fontSize: '12px'
                    }}>
                        {this.state.updateMessage}
                    </div>





                </div>

                <div className="inner"
                    style={{
                        flexGrow: 1
                    }}
                >
                    <textarea value={this.state.noteText} style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        fontSize: 16
                    }} rows={10} onChange={
                        (e) => this.setState({ noteText: e.target.value })
                    }>

                    </textarea>
                </div>
            </div>
        )
    }
}
