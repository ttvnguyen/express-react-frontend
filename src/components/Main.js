import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "../pages/Index"
import Show from "../pages/Show"

const URL = "http://localhost:4000/people/";
// const URL= "https://test-express-react-backend:herokuapp.com/people/"
export default (props) =>{

    const [people, setPeople] = useState([]);
  const getPeople = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setPeople(data);
  };

  const createPeople = async (person) => {
    
    // make post request to create people
   await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    // update list of people
    getPeople();
  };
  const updatePeople = async (person, id) => {
    // make post request to create people
    await fetch(URL + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    // update list of people
    getPeople();
  };

  const deletePeople = async (id) => {
    // make post request to create people
    await fetch(URL + id, {
      method: "delete",
    });
    // update list of people
    getPeople();
  };

  useEffect(() => getPeople, []);

    return (
        <main>
      <Routes>
        <Route path="/" element={<Index people={people} createPeople= {createPeople}/>}/>
        <Route path="/people/:id" element={<Show 
        people={people}
        updatePeople={updatePeople}
        deletePeople={deletePeople}/>}/>
      </Routes>
    </main>
    )
}