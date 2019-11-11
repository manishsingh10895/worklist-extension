import React, { Props } from "react";
import Container from "@material-ui/core/Container";
import { height } from "@material-ui/system";
import NewListForm from "./NewListForm";
import WorkListComponent from "./Worklist";
import WorkList from "../models/list.model";
import { Grid } from "@material-ui/core";
import { Storage } from "../services/storage.service";
import Task from "../models/task.model";
import background from '../assets/background.jpg';

import './WorkArea.css';

const styles = {
    height: "100vh",
    width: "100vw",
    overFlowY: 'auto'
};

type WorkAreaState = {
    workLists: WorkList[],
    backgroundImage: string
}


export default class WorkArea extends React.Component<React.PropsWithChildren<any>, WorkAreaState> {

    workLists: WorkList[] = [];

    interval: any;

    onNewList(list: WorkList) {
        console.log(list);

        this.setState((state) => {
            let workLists = state.workLists.concat(list);

            return {
                workLists: workLists
            };
        });
    }

    /**
     * Handle worklist deletion
     */
    onWorklistDelete(id: string) {
        this.setState((state) => {
            let list = state.workLists.filter((wl) => {
                return wl.id != id;
            });

            console.log(list);

            return {
                workLists: list
            };
        })
    }

    state: WorkAreaState = {
        workLists: [],
        backgroundImage: ''
    };


    /**
     * Handles updation for a new task passes on by worklist component
     * @param wlId worklist id 
     * @param taskId Task id
     * @param task updated task
     */
    _handleTaskUpdate(wlId: string, taskId: string, task: Task) {
        let wl = this._findWorklistById(wlId) as WorkList;

        if (!wl) return;

        let _oldTask = wl.findById(taskId);

        if (!_oldTask) return;

        _oldTask = {
            ..._oldTask,
            completed: task.completed,
            isCheckedItem: task.isCheckedItem,
            title: task.title
        };

        let worklists: WorkList[] = this.state.workLists.map((wl) =>
            (
                wl.id == wlId)
                ?
                { ...wl, list: wl.list } as WorkList
                :
                wl
        );

        this.setState((state) => {
            return {
                ...state,
                workLists: worklists
            }
        });
    }


    /**
     * Handle creation of new task passed on by
     * @param wlId workList id 
     * @param task new Task
     */
    _handleNewTask(wlId: string, task: Task) {
        let wl: WorkList = this._findWorklistById(wlId) as WorkList;

        if (wl) {
            wl.addItem(task);
        }

        let worklists: WorkList[] = this.state.workLists.map((wl) =>
            (
                wl.id == wlId)
                ?
                { ...wl, list: wl.list } as WorkList
                :
                wl
        );

        this.setState((state: WorkAreaState) => {
            return {
                ...state,
                workLists: worklists
            }
        });
    }

    /**
     * Handle task delete
     */
    _handleTaskDelete(wlId: string, id: string) {
        let wl: WorkList = this._findWorklistById(wlId) as WorkList;

        if (wl) {
            wl.removeItem(wl.findById(id));
        }
    }

    /**
     * Find a worklist by id    
     * @param id id for the worklist
     */
    _findWorklistById(id: string): WorkList | undefined {
        return this.state.workLists.find((wl) => wl.id == id);
    }

    /**
     * Finds a worklist by title
     * @param title title for worklist
     */
    _findWorkListByTitle(title: string): WorkList | undefined {
        return this.state.workLists.find((wl) => wl.title == title);
    }

    /**
     * Fetches latest data from storage for the work area
     */
    async _fetchWorkArea() {
        let worklists = await Storage.GetWorkArea();


        this.setState({
            workLists: worklists
        });
    }

    componentDidMount() {
        this._fetchWorkArea();


        this.interval = setInterval(async () => {
            console.log(this.state.workLists);

            await Storage.SaveWorkArea(this.state.workLists);

            console.log("WorkSpace updated");
        }, 5000);
    }

    handleWorklistUpdate(id: string, worklist: WorkList) {

        console.log("[WorkArea.Update]");
        console.log(worklist);

        this.setState((state) => {
            return {
                workLists: this.state.workLists.map((wl) => {
                    console.log(wl);
                    if (wl.id == id)
                        return worklist
                    else
                        return wl;
                })
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentWillMount() {


        const rand = Math.floor(Math.random() * 10000);

        const bingImageUrl = `https://picsum.photos/seed/${rand}/1920/1336`;

        let image = new Image();

        image.src = bingImageUrl;

        image.onload = () => {
            this.setState({
                backgroundImage: bingImageUrl
            });
        };

        image.onerror = () => {
            this.setState({
                backgroundImage: background
            });
        }


    }

    _renderWorklists() {
        return this.state.workLists.map((wl: WorkList, i: number) => {
            return (
                <WorkListComponent
                    id={i}
                    onWorklistDelete={this.onWorklistDelete.bind(this)}
                    worklist={wl}
                    key={wl.id}
                    onWorkListUpdate={this.handleWorklistUpdate.bind(this)}
                ></WorkListComponent>
            )
        });
    }

    render() {
        let style: React.CSSProperties = {
            backgroundImage: `url(${this.state.backgroundImage ? this.state.backgroundImage : background})`,
            backgroundRepeat: 'none',
            backgroundSize: 'cover',
            height: 'calc(100% - 64px)',
            overflowY: 'auto',
            backgroundAttachment: 'fixed'
        };

        return (
            <div style={style} className={this.state.backgroundImage ? 'img-lazy-load lazy-loaded' : 'img-lazy-load'}>
                <Container style={styles} >
                    <NewListForm onNewList={this.onNewList.bind(this)}></NewListForm>

                    <div className="work-lists">
                        <Grid container spacing={3}>
                            {this._renderWorklists()}
                        </Grid>
                    </div>
                </Container>
            </div>
        );
    }

}