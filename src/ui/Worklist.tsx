import React from "react";
import WorkList from "../models/list.model";
import Task from "../models/task.model";
import { Card, CardHeader, CardContent, Grid, IconButton, Tooltip } from "@material-ui/core";
import TaskComponent from "./Task";
import { NewTaskForm } from "./NewTaskForm";
import { Remove, RemoveCircle, ExpandLess, ExpandMore } from "@material-ui/icons";

import './WorkList.css';

type Inputs = {
    worklist: WorkList,
    onWorklistDelete: any,
    id: number,
    onWorkListUpdate: any
}

type WorkListComponentState = {
    title: string,
    tasks: Task[],
    id: string,
    expanded: boolean
};

export default class WorkListComponent extends React.Component<Inputs, WorkListComponentState> {

    state = {
        id: '',
        title: '',
        tasks: [],
        expanded: true
    }

    _handleTaskCompleteChange(completed: boolean, task: Task) {
        console.log(task);
        console.log(completed);

        this.setState((state) => {
            let t = state.tasks.find(t => t == task);

            if (t) {
                t.completed = completed;


                return {
                    tasks: state.tasks
                };
            }

            return {
                ...state
            };
        }, () => {
            this.props.onWorkListUpdate(this.state.id, this._stateToWorklist());
        })
    }

    _stateToWorklist(): Partial<WorkList> {
        return {
            list: this.state.tasks,
            id: this.state.id,
            title: this.state.title
        };
    }

    /**
     * Handles creation of nrwe task
     * @param task New task
     */
    handleNewTask(task: Task) {
        this.setState((state) => {
            let t = state.tasks.concat(task);

            return {
                tasks: t
            };

        },
            () => {
                this.props.onWorkListUpdate(this.state.id, {
                    id: this.state.id,
                    title: this.state.title,
                    list: this.state.tasks,
                });
            })
    }

    /**
     * Deletes task with provided id
     * @param id task id
     */
    handleTaskDelete(id: string) {
        this.setState((state) => {
            let t = state.tasks.findIndex((t) => t.id == id);

            state.tasks.splice(t, 1);

            this.props.onWorkListUpdate(this.state.id, this.state);

            return {
                tasks: state.tasks
            };
        }, () => {
            this.props.onWorkListUpdate(this._stateToWorklist());
        })
    }

    componentDidMount() {
        this.setState({
            id: this.props.worklist.id,
            title: this.props.worklist.title,
            tasks: this.props.worklist.list || []
        });
    }

    toggleExpansion() {
        this.setState({
            expanded: !this.state.expanded
        })

        console.log(this.state.expanded);
    }

    render() {
        console.log(this.state.expanded);
        return <Grid item xs={12} sm={12} lg={6} md={6}>
            <Card className={`worklist ${this.state.expanded ? 'expanded' : ''}`}  >
                <CardHeader title={this.state.title}
                    action={
                        <>
                            <Tooltip title="Toggle Expand" placement="left">
                                <IconButton color="primary" onClick={(e) => this.toggleExpansion()}>
                                    {
                                        this.state.expanded ?
                                            <ExpandLess /> :
                                            <ExpandMore />
                                    }
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Remove list" placement="right">
                                <IconButton color="secondary" onClick={(e) => this.props.onWorklistDelete(this.props.worklist.id)} size="small" aria-label="settings">
                                    <RemoveCircle />
                                </IconButton>
                            </Tooltip>
                        </>
                    }
                >

                </CardHeader>

                <CardContent className="worklist-content">
                    <div className="task-list">
                        {this.state.tasks.map((t: Task) => {
                            console.log(t.id);
                            return <TaskComponent key={t.id} task={t}
                                onTaskCompleteChange={this._handleTaskCompleteChange.bind(this)}
                                onTaskDelete={this.handleTaskDelete.bind(this)}
                            >

                            </TaskComponent>
                        })}
                    </div>

                    <div className="new-task-form">
                        <NewTaskForm isCheckedItem={this.props.worklist.isChecklist} onNewTask={this.handleNewTask.bind(this)}></NewTaskForm>
                    </div>
                </CardContent>
            </Card>

        </Grid>;
    }

}