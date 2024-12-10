import React from 'react'
import GroupLists from '../group/GroupLists'
import GroupDetails from '../group/GroupDetails'
import { Route, Routes } from 'react-router-dom'
import Login from '../user/Login'
import Register from '../user/Register'
import Account from '../user/Account'
import Event from '../events/Event'
import EventForm from '../events/EventForm'

const Main = () => {
    return (
        <div className='main'>
            <Routes>
                <Route exact path='/' element={ <GroupLists /> } />
                <Route path='/details/:id' element={ <GroupDetails /> } />
                <Route path='/login' element={ <Login /> } />
                <Route path='/register' element={ <Register /> } />
                <Route path='/account' element={ <Account /> } />
                <Route path='/event/:id' element={ <Event /> } />
                <Route path='/event-form' element={ <EventForm /> } />
            </Routes>
        </div>
    )
}

export default Main