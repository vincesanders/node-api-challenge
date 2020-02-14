import React from 'react';
import styled from 'styled-components';

const ProjectContainer = styled.div`
    width: 250px;
    border: 2px solid steelblue;
    border-radius: 8px;
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
            }) : (<div><p>No action yet taken.</p></div>)}
        </ProjectContainer>
    );
}