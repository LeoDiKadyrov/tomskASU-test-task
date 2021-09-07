import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AddPersonForm } from './AddPersonForm.js'
import { Link } from 'react-router-dom'
import { selectAllPersons, fetchPersons } from './personSlice'
import { unwrapResult } from '@reduxjs/toolkit'

export const PersonsList = () => {
    const dispatch = useDispatch()
    const persons = useSelector(selectAllPersons)

    const personStatus = useSelector(state => state.persons.status)

    useEffect(() => {
        if (personStatus === 'idle') {
            dispatch(fetchPersons()).then(unwrapResult)
        }
    }, [personStatus, dispatch])

    console.log("check commit");

    const renderedPersons = persons.map(person => (
        <div key={person.id}>
            {/* <p className="post-content">{person.id}</p> */}
            <p className="post-content">{person.firstName}</p>
            <p className="post-content">{person.lastName}</p>
            <Link to={`/editPerson/${person.id}`} className="button">
                Edit Post
            </Link>
            <button>Удалить</button>
       </div>
    ));
    return (
        <section className="posts-list">
            <h2>Persons</h2>
            {renderedPersons}
            <AddPersonForm />
        </section>
    )
}