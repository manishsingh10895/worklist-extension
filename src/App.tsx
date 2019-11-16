import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './ui/Header';
import WorkArea from './ui/WorkArea';
import NotesDrawer from './ui/NotesDrawer';
import TopSitesDrawer from './ui/TopSitesDrawer';

import './drawer.css';

type AppState = {
  notesDrawerOpened: boolean,
  topSitesDrawerOpened: boolean
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

const App: React.FC = () => {

  const [state, setState] = useState({
    notesDrawerOpened: false,
    topSitesDrawerOpened: false
  })

  return (
    <div className="App">
      <div className="header">
        <AppHeader openNotesDrawer={() => openNotesDrawer(state, setState)}></AppHeader>
      </div>
      <div className="work-area">
        <WorkArea>
        </WorkArea>
      </div>

      <div className={`notes-container drawer drawer-right ${state.notesDrawerOpened ? 'active' : ''}`}>
        <NotesDrawer onClose={() => closeNotesDrawer(state, setState)} open={state.notesDrawerOpened}></NotesDrawer>
      </div>

      <div className="top-sites-container">
        <TopSitesDrawer></TopSitesDrawer>
      </div>

    </div>
  );
}

export default App;
