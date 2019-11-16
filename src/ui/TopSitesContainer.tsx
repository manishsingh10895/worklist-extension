import React, { Component } from 'react'

import { Chip } from '@material-ui/core';
import { string } from 'prop-types';
import '../drawer.css';

type TopSitesState = {
    topSites: {
        url: string,
        title: string
    }[]
}

export default class TopSitesContainer extends Component<any, TopSitesState> {
    state: TopSitesState = {
        topSites: []
    }

    componentDidMount() {
        this.setState({
            topSites: [
                { url: 'https://google.com', title: 'Google' },
                { url: 'https://youtube.com', title: 'Youtube' }
            ]
        });
    }

    render() {
        return (
            <div className="drawer-inner-container" >
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', }}>
                    {
                        this.state.topSites.map((s, i) => {
                            return (
                                <TopSite key={i} url={s.url} title={s.title}></TopSite>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

function TopSite(props: any) {
    return (
        <a href={props.url} target="_blank">
            <Chip
                label={props.title}
            >

            </Chip>
        </a>
    )
}