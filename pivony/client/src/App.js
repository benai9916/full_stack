import React, { useState } from 'react';
import uuid from 'uuid/v4';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

// local import
import SidBar from "./components/SidBar"
import Canvas from "./components/Canvas"
import Graphs from "./components/Graph"
import { fetchWeatherData } from "./services/api"

const copy = (source, destination, droppableSource, droppableDestination) => {
  // const sourceClone = Array.from(source);
  // const destClone = Array.from(destination);
  const item = source[droppableSource.index];

  destination.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destination;
};

const Content = styled.div`
    margin-right: 200px;
`;

const ITEMS = [
  {
    id: uuid(),
    content: 'Line chart'
  }
];

const App = () => {
  const [element, setElement] = useState({ [uuid()]: [] })
  const [weatherData, setWeatherData] = useState([])

  const graphs = [
    {
      'Line chart': <Graphs data={weatherData} />
    }
  ]

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the canvas
    if (!destination) {
      return;
    }

    if (source.droppableId === 'ITEMS') {
      fetchWeatherData()
        .then(res => {
          setWeatherData(arr => [...arr, res.data])
        }).catch(err => {
          console.log(err)
        })

      setElement({
        [destination.droppableId]: copy(ITEMS, element[destination.droppableId], source,destination)
      });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>

        <SidBar items={ITEMS} />

        <Content>
          {Object.keys(element).map((list, idx) => {
            return (
              <Canvas key={list + idx} list={list} state={element} graphs={graphs} weatherData={weatherData} />
            );
          })}
        </Content>

      </DragDropContext>
    </>
  );
}


export default App
