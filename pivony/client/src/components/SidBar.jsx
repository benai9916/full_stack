import React from 'react'
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Item = styled.div`
    display: flex;
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

const Clone = styled(Item)`
    + div {
        display: none !important;
    }
`;

const List = styled.div`
    border: 1px
        ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
    background: #fff;
    padding: 2.5rem 0.5rem 0;
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
`;

const Kiosk = styled(List)`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 200px;
`;

const SidBar = ({items}) => {
  return (
    <Droppable droppableId="ITEMS" isDropDisabled={true}>
      {(provided, snapshot) => (
        <Kiosk
          innerRef={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}>

          {items.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={item.id}
              index={index}>
              {(provided, snapshot) => (
                <>
                  <Item
                    innerRef={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                    style={
                      provided.draggableProps
                        .style
                    }>
                    {item.content}
                  </Item>
                  {snapshot.isDragging && (
                    <Clone>{item.content}</Clone>
                  )}
                </>
              )}
            </Draggable>
          ))}

        </Kiosk>
      )}
    </Droppable>
  )
}

export default SidBar
