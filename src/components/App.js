import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import Login from './Login'
import Dashboard from './Dashboard'
import {ContactsProvider } from '../contexts/ContactsProvider'
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketsProvider } from '../contexts/SocketsProvider';

function App() {

  const [id, setId] = useLocalStorage('id');

  const dashboard = (
    <SocketsProvider id={id}>

    <ContactsProvider>
      <ConversationsProvider id={ id }>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>

    </SocketsProvider>
  )

  return (
      id ? dashboard : <Login onIdSubmit={setId}/>
  );
}

export default App;
