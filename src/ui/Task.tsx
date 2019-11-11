import Task from "../models/task.model";
import { ListItem, ListItemText, Switch, ListItemIcon, Fab } from "@material-ui/core";
import React from "react";
import { Check, Close } from '@material-ui/icons';

type Inputs = {
    task: Task,
    onTaskCompleteChange: any,
    onTaskDelete: any,
    isCompletable: boolean
}

function renderSuffix(props: Inputs) {
    if (props.isCompletable) {
        return (
            <Switch checked={props.task.completed} onChange={(e) => props.onTaskCompleteChange(e.target.checked, props.task)}>
            </Switch>
        )
    }

}

function renderPrefix(props: Inputs) {
    return <ListItemIcon>
        <Fab size="small" color="secondary" onClick={(e) => props.onTaskDelete(props.task.id)}>
            <Close></Close>
        </Fab>
    </ListItemIcon>;
}

export default function TaskComponent(props: any) {


    return (
        <ListItem button>
            {renderPrefix(props)}

            <ListItemText>
                {props.task.title}
            </ListItemText>

            {renderSuffix(props)}
        </ListItem>
    )
}