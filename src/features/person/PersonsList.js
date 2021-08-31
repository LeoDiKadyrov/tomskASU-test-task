import React from 'react'
import { useSelector } from 'react-redux'

export const PersonsList = () => {
    const persons = useSelector(state => state.persons)

    const renderedPersons = persons.map(person => (
        <div key={person.id}>
            <p className="post-content">{person.id}</p>
            <p className="post-content">{person.firstName}</p>
            <p className="post-content">{person.lastName}</p>
       </div>
    ))

    return (
        <section className="posts-list">
            <h2>Persons</h2>
            {renderedPersons}
        </section>
    )
}