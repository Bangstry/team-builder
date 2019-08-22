import React, { useState } from 'react';
import './App.css';
import Card from './components/Card';
import Form from './components/Form';
import { Route, Link } from 'react-router-dom';
function App() {
  const [people, setPeople] = useState([
    {id: 0, name: "Tyler", email: "nice@try", role: "Student"},
    {id: 1, name: "Ryan", email: "good@try", role: "TL"},
  ]);

  const addPerson = person => {
    setPeople([...people, {...person, id:Date.now()}]);
  };

  const editPerson = editedPerson => {
    const peopleCopy = [...people];
    // const oldPerson = peopleCopy.find(person => person.id === editedPerson.id);
    // console.log(editedPerson, oldPerson);
    // oldPerson.name = editedPerson.name;
    // oldPerson.email = editedPerson.email;
    // oldPerson.role = editedPerson.role;
    // Object.assign(oldPerson, editedPerson);
    const personIndex = peopleCopy.findIndex(person => person.id === editedPerson.id);
    peopleCopy[0] = editedPerson;
    setPeople(peopleCopy);
  };
  return (
    <div className="App">
      <Link to="/">Home</Link>
      <Link to="/add">Add person</Link>
      <Route path="/add" render={props => <Form {...props}
                                                submitPerson={addPerson}
                                            buttonText="Add Person"
                                          />}/>
      <Route exact path="/"
             render={props => people.map(person => <Card person={person}/>)}/>
      <Route path="/edit/:id"
             render={props => {
                const person = people.find(person => person.id.toString() === props.match.params.id)
                return <Form {...props}
                             initialPerson={person}
                             submitPerson={editPerson}
                          buttonText="Edit Person"
                       />;
              }}/>
    </div>
  );
}

export default App;
