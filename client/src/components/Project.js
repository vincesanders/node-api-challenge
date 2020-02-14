import React from 'react';
import styled from 'styled-components';

const ProjectContainer = styled.div`
    width: 400px;
    border: 2px solid steelblue;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    * {
        width: 90%;
    }
    p {
        text-align: left;
    }
    h4 {
        text-align: left;
        display: list-item;
        list-style-type: disc;
        list-style-position: inside;
    }
`

export default ({ project }) => {
    return (
        <ProjectContainer>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            {(project.actions && project.actions.length > 0) ? 
            project.actions.map(action => {
                return (
                    <div>
                        <h4>{action.description}</h4>
                        <p>notes:<br />{action.notes}</p>
                    </div>
                );
            }) : <div><p>No action yet taken.</p></div>}
        </ProjectContainer>
    );
}