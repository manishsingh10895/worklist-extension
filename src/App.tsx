import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './ui/Header';
import WorkArea from './ui/WorkArea';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppHeader></AppHeader>

      <WorkArea>
      </WorkArea>

    </div>
  );
}

export default App;
