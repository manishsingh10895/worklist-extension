import React from 'react'
import { Drawer, Typography } from '@material-ui/core'
import TopSitesContainer from './TopSitesContainer';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import { useTheme } from '@material-ui/styles';
import { ArrowDownward } from '@material-ui/icons';


export default function TopSitesDrawer(props: any) {
    let theme = useTheme()
    console.log(theme);
    return (
        <div className="topsites-drawer" >
            <div style={{ backgroundColor: 'rgb(62, 81, 181)', width: '100%', height: '20px', display: 'flex', justifyContent: 'center' }}>
                {props.open ?
                    <span style={{ color: 'white' }}>
                        Most Visited Sites
                    </span> :

                    <ArrowUpward style={{ color: 'white' }} />

                }
            </div>
            <TopSitesContainer />
        </div>
    )
}
