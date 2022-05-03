import React from 'react'
import uuid from 'uuid/v4';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

const List = styled.div`
    border: 1px
        ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
    background: #fff;
    padding: 0.5rem 0.5rem 0;
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
`;

const Container = styled(List)`
    display: flex;
    flex-wrap: wrap;
    column-gap: 4rem;
    row-gap: 3rem;
    margin: 2.5rem 2rem 1.5rem;
    min-height: 40px;
    background: #ccc;
`;

const Item = styled.div`
    widht: 50%;
    user-select: none;
    padding: 0.5rem;
    margin: 0 0 0.5rem 0;
    align-items: flex-start;
    align-content: flex-start;
    line-height: 1.5;
    border-radius: 3px;
    background: #fff;
    border: 1px ${props => (props.isDragging ? 'dashed #4099ff' : 'solid #ddd')};
`;

const Heading2 = styled.h1`
  padding: 0 20px;
  width: auto;
`

const Canvas = ({ list, state, graphs ,weatherData}) => {
  return (
    <Droppable key={list} droppableId={list}>
      {(provided, snapshot) => (
        <Container
          innerRef={provided.innerRef}
          isDraggingOver={
            snapshot.isDraggingOver
          }>
          {state[list].length
            ? state[list].map(
              (item, index) => (

                <Item key={uuid()}>
                  {weatherData.length ? (
                    <>
                      {graphs[0][item.content]}
                    </>
                  ): (
                    <Heading2> Loading ....</Heading2>
                  )}
                  
                </Item>
              )
            )
            : !provided.placeholder && (
              <div>
                Drop items here
              </div>
            )}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  )
}

export default React.memo(Canvas)