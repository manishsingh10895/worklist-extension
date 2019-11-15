import React, { FormEvent, ChangeEvent } from "react";
import { TextField, FormGroup, FormControl, FormControlLabel, Switch, Box, Button } from "@material-ui/core";

import './NewListForm.css';
import Task from "../models/task.model";

type Inputs = {
    onNewTask: Function,
    //If this task comes under a checklist
    isCheckedItem?: boolean
};

export class NewTaskForm extends React.Component<Inputs> {
    state = {
        title: '',
        completed: false,
        isChecklist: false,
    };

    constructor(props: Inputs) {
        super(props);
    }

    handleSubmit(e: FormEvent) {
        e.preventDefault();

        console.log(this.state);

        let t = new Task(this.state.title, this.props.isCheckedItem ? true : false);

        this.props.onNewTask(t);

        this.setState({
            title: '',
            completed: false,
            isChecklist: false
        });
    }

    handleChecklistChange(e: any) {
        this.setState({
            isChecklist: e.target.checked
        });
    }

    render() {
        return (
            <Box component="div" className="new-task-form">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup row className="form-group">
                        <FormControl style={{ width: '100%' }}>
                            <TextField value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} placeholder="New Task title"></TextField>
                        </FormControl>
                    </FormGroup>
                </form>
            </Box>
        );
    }
}