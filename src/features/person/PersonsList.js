import React from 'react'
import { useSelector } from 'react-redux'
import { AddPersonForm } from './AddPersonForm.js'
import { Link } from 'react-router-dom'

export const PersonsList = () => {
    const persons = useSelector(state => state.persons)

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