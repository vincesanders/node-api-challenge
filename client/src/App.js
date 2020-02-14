import React, { useState } from 'react';
import axios from 'axios';
import Project from './components/Project';
import './App.css';

let initialRender = true;

function App() {
  const [projects, setProjects] = useState([]);

  const getProjects = () => {
    axios.get('http://localhost:5000/api/projects')
    .then(res => {
      //return an array of projects
      const fetchedProjects = res.data;
      //Get all actions
      getActions(fetchedProjects);
    }).catch(err => console.log(err));
  }

  const getActions = (fetchedProjects) => {
    axios.get('http://localhost:5000/api/actions')
    .then(res => {
      //return an array of actions
      const fetchedActions = res.data;
      //put the actions in an array inside the project object
      fetchedActions.forEach(action => {
        fetchedProjects.forEach(project => {
          if (action.project_id === project.id) {
            if (!project.actions) {
              project.actions = [];
            }
            project = {
              ...project,
              actions: [...project.actions, action]
            }
          }
        })
      });
      setProjects(fetchedProjects);

    }).catch(err => console.log(err));
  }

  const loadApp = () => {
    if (initialRender) {
      //get data on load of the app.
      getProjects();
      initialRender = false;
    }
  }

  loadApp();

  return (
    <div className="App">
      {projects.length > 0 ?
      projects.map( project => (<Project key={project.id} project={project} />)) :
      (<div><h2>Loading projects...</h2></div>)}
    </div>
  );
}

export default App;
