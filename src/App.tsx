import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <h1 className='primary-heading'>Notes App</h1>
        <NoteForm />
        <NoteList />
      </div>
    </Provider>
  );
};

export default App;
