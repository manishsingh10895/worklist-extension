import React, { FormEvent, ChangeEvent } from "react";
import { TextField, FormGroup, FormControl, FormControlLabel, Switch, Box, Button } from "@material-ui/core";

import './NewListForm.css';
import Task from "../models/task.model";

type Inputs = {
    onNewTask: Function
};

export class NewTaskForm extends React.Component<Inputs> {
    state = {
        title: '',
        completed: false
    };

    constructor(props: Inputs) {
        super(props);
    }

    handleSubmit(e: FormEvent) {
        e.preventDefault();

        console.log(this.state);

        let t = new Task(this.state.title, this.state.completed);

        this.props.onNewTask(t);

        this.setState({
            title: '',
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
            <Box component="div">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup row className="form-group">
                        <FormControl>
                            <TextField value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} placeholder="New Task title"></TextField>
                        </FormControl>
                    </FormGroup>
                </form>
            </Box>
        );
    }
}