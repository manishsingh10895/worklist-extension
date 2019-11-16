import React from 'react'
import { Drawer } from '@material-ui/core'
import TopSitesContainer from './TopSitesContainer';

export default function TopSitesDrawer() {
    return (
        <div className="drawer drawer-bottom">
            <TopSitesContainer />
        </div>
    )
}
