import React from "react";
import WorkList from "../models/list.model";
import Task from "../models/task.model";
import { Card, CardHeader, CardContent, Grid, IconButton } from "@material-ui/core";
import TaskComponent from "./Task";
import { NewTaskForm } from "./NewTaskForm";
import { Remove } from "@material-ui/icons";

type Inputs = {
    worklist: WorkList,
    onWorklistDelete: any,
    id: number,
    onWorkListUpdate: any
}

type WorkListComponentState = {
    title: string,
    tasks: Task[],
    id: string
};

export default class WorkListComponent extends React.Component<Inputs, WorkListComponentState> {

    state = {
        id: '',
        title: '',
        tasks: []
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
            id: this.state.id,
            list: this.state.tasks,
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

    render() {
        return <Grid item xs={12} sm={12} lg={6} md={6}>
            <Card >
                <CardHeader title={this.state.title}
                    action={
                        <IconButton color="secondary" onClick={(e) => this.props.onWorklistDelete(this.props.worklist.id)} size="small" aria-label="settings">
                            <Remove />
                        </IconButton>
                    }
                >

                </CardHeader>

                <CardContent>
                    <div className="task-list">
                        {this.state.tasks.map((t: Task) => {
                            console.log(t.id);
                            return <TaskComponent key={t.id} task={t}
                                isCompletable={this.props.worklist.isChecklist}
                                onTaskCompleteChange={this._handleTaskCompleteChange.bind(this)}
                                onTaskDelete={this.handleTaskDelete.bind(this)}
                            >

                            </TaskComponent>
                        })}
                    </div>

                    <div className="new-task-form">
                        <NewTaskForm onNewTask={this.handleNewTask.bind(this)}></NewTaskForm>
                    </div>
                </CardContent>
            </Card>

        </Grid>;
    }

}