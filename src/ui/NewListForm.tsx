import React, { FormEvent, ChangeEvent } from "react";
import { TextField, FormGroup, FormControl, FormControlLabel, Switch, Box, Button } from "@material-ui/core";

import './NewListForm.css';
import WorkList from "../models/list.model";
import { withStyles, withTheme, DefaultTheme } from "@material-ui/styles";
import { ThemeProviderProps } from "@material-ui/styles/ThemeProvider";

interface Inputs {
    onNewList: Function
};

class NewListForm extends React.Component<Inputs> {

    state = {
        title: '',
        isChecklist: false
    };

    constructor(props: Inputs) {
        super(props);
    }

    handleSubmit(e: FormEvent) {
        e.preventDefault();

        console.log(this.state);
        this.props.onNewList(new WorkList(this.state.title, this.state.isChecklist));

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

        const styles: React.CSSProperties = {
            borderBottomLeftRadius: '80px',
            borderBottomRightRadius: '80px',
            color: 'white',
            marginBottom: '15px',
            backgroundColor: '#3e51b5'
        };

        const inputStyles: React.CSSProperties = {
            color: 'white'
        };

        return (
            <Box color="primary" component="div" style={styles} className="new-list-form">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup row className="form-group">
                        <FormControl>
                            <TextField value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} placeholder="Title for the new list"></TextField>
                        </FormControl>
                        <FormControlLabel control={
                            <Switch checked={this.state.isChecklist} onChange={this.handleChecklistChange.bind(this)}></Switch>
                        } label="Is checklist">
                        </FormControlLabel>
                    </FormGroup>


                    <div>
                        <FormGroup row>
                            <Button type="submit" className="form-button" variant="contained" color="primary">
                                Add
                        </Button>
                        </FormGroup>
                    </div>
                </form>
            </Box>
        );
    }
}


export default NewListForm;