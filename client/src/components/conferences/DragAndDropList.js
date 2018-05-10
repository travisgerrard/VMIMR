import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 0.75,
  margin: `0 0 ${grid}px 0`,
  height: 30,
  // change background colour if dragging
  background: isDragging ? '#5E9B6A' : '#E8F4DF',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'Ivory' : 'Ivory',
  padding: grid,
});

class DragAndDropList extends Component {
  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.props.data,
      result.source.index,
      result.destination.index,
    );

    this.props.updateListOrder(items, this.props.arrayName);
  };

  strikeThroughItemAtIndex = index => {
    this.props.strikeThroughItemAtIndex(index, this.props.arrayName);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.props.data.map((item, index) => (
                <Draggable
                  key={item.name}
                  draggableId={item.name}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                      onClick={() => this.strikeThroughItemAtIndex(index)}
                    >
                      {item.struckThrough ? (
                        <s>{item.name}</s>
                      ) : (
                        <b>{item.name}</b>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default DragAndDropList;
