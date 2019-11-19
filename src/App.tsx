import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './ui/Header';
import WorkArea from './ui/WorkArea';
import NotesDrawer from './ui/NotesDrawer';
import TopSitesDrawer from './ui/TopSitesDrawer';

import './drawer.css';

import { makeContextMenu } from './context-menu';

type AppState = {
  notesDrawerOpened: boolean,
  topSitesDrawerOpened: boolean,
  searchTerm: string
}

function openNotesDrawer(state: AppState, setState: (state: AppState) => void) {
  setState({
    ...state,
    notesDrawerOpened: true
  })
}

function closeNotesDrawer(state: AppState, setState: (state: AppState) => void) {
  setState({
    ...state,
    notesDrawerOpened: false
  })
}

function openTopSitesDrawer(state: AppState, setState: (state: AppState) => void) {
  setState({
    ...state,
    topSitesDrawerOpened: true,
  })
}

function closeTopSitesDrawer(state: AppState, setState: (state: AppState) => void) {
  setState({
    ...state,
    topSitesDrawerOpened: false,
    searchTerm: ''
  })
}

function searchLists() {

}

const App: React.FC = () => {
  const [state, setState] = useState({
    notesDrawerOpened: false,
    topSitesDrawerOpened: false,
    searchTerm: ''
  })

  return (
    <div className="App">
      <div className="header">
        <AppHeader onSearch={(q: string) => setState({ ...state, searchTerm: q })} openNotesDrawer={() => openNotesDrawer(state, setState)}></AppHeader>
      </div>
      <div className="work-area">
        <WorkArea search={state.searchTerm}>
        </WorkArea>
      </div>

      <div className={`notes-container drawer drawer-right ${state.notesDrawerOpened ? 'active' : ''}`}>
        <NotesDrawer onClose={() => closeNotesDrawer(state, setState)} open={state.notesDrawerOpened}></NotesDrawer>
      </div>

      <div onMouseEnter={(e) => openTopSitesDrawer(state, setState)} onMouseLeave={() => closeTopSitesDrawer(state, setState)}
        className={`top-sites-container drawer drawer-bottom ${state.topSitesDrawerOpened ? 'active' : ''}`} >
        <TopSitesDrawer open={state.topSitesDrawerOpened} onClose={() => closeTopSitesDrawer(state, setState)}></TopSitesDrawer>
      </div>

    </div>
  );
}

export default App;
