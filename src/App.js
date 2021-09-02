import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import { PersonsList } from './features/person/PersonsList.js'
import { EditPersonForm } from './features/person/EditPersonForm.js'

// TODO:
// [] - Получать список сущностей через асинхронные запросы на json-server
// [] - Добавить удаление сущностей через запросы
// [] - Редактирование через запросы
// [] - UI оформление ???


function App() {
  const getJSON = async () => {
    fetch("http://localhost:3000/persons")
      .then(response => response.json())
      .then(data => console.log(data));
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route 
            exact
            path="/"
            render={() => (
              <div onClick={getJSON}>
                  <PersonsList />
              </div>
            )} />
          <Route exact path="/editPerson/:personId" component={EditPersonForm} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;


/* for post/put requests
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
*/