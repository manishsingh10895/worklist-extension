import Task from "../models/task.model";
import { ListItem, ListItemText, Switch, ListItemIcon, Fab, IconButton } from "@material-ui/core";
import React from "react";
import { Check, Close } from '@material-ui/icons';

const URL_REGEX = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

type Inputs = {
    task: Task,
    onTaskCompleteChange: any,
    onTaskDelete: any
}

function renderPrefix(props: Inputs) {
    console.log(props);
    if (props.task.isCheckedItem) {
        return (
            <Switch checked={props.task.completed} onChange={(e) => props.onTaskCompleteChange(e.target.checked, props.task)}>
            </Switch>
        )
    }

}

function renderSuffix(props: Inputs) {
    return <ListItemIcon
        style={{ fontSize: "1rem" }}
        color="secondary" onClick={(e) => props.onTaskDelete(props.task.id)}>
        <IconButton>
            <Close color="secondary" ></Close>
        </IconButton>
    </ListItemIcon>;
}

function isUrl(s: string): boolean {
    return URL_REGEX.test(s);
}


export default function TaskComponent(props: any) {
    return (
        <ListItem button>
            {renderPrefix(props)}

            <ListItemText>
                {
                    isUrl(props.task.title) ? (
                        <div>
                            <a href={props.task.title} target="_blank">{props.task.title}</a>
                        </div>
                    ) : (<>{props.task.title}</>)
                }
            </ListItemText>

            {renderSuffix(props)}
        </ListItem>
    )
}