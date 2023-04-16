import { useEffect, useState, useReducer, useMemo, useContext } from 'react';
import { Context } from './context/FirestoreContext'
import Firestore from './handlers/firestore'
import { useAuthContext } from './context/AuthContext' 
import Card from './components/Card'
import List  from './components/List'
import './App.css';


function App() {    
    const { dispatch, state, read } = useContext(Context) 
    const { authenticate } = useAuthContext()  
    const handleOnChange = (e) => dispatch({ type: 'setInputs', payload: { value: e}})    
    const handleOnSubmit =(e) => {
      e.preventDefault()  
      dispatch({ type: 'setItem'})   

    }

    const count = useMemo(() => {
        return `you have ${state.items.length} image${state.items.length > 1 ? 's': ''}` 
    }, [state.items])

    useEffect(() => {
      read()
      authenticate()
    }, [])

      
  return (
    <>  
        <h1 className='text-center'>GALLERY</h1>
        {count}
        <List items={state.items}/>
    </>
  );
}

export default App;
