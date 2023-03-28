import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Grid() {
  const [gridItems, setGridItems] = useState([
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
    { id: '4', content: 'Item 4' },
    { id: '5', content: 'Item 5' },
    { id: '6', content: 'Item 6' },
  ]);

  useEffect(() => {
    // Update the draggableId of each grid item to match the current state
    const newGridItems = gridItems.map((item, index) => ({
      ...item,
      draggableId: `item-${index}`,
    }));
    setGridItems(newGridItems);
  }, [gridItems]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(gridItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setGridItems(items);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="grid">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="grid">
            {gridItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.draggableId} index={index}>
                {(provided, snapshot) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`grid-item ${snapshot.isDragging ? 'dragging' : ''}`}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="trash-box">
        <span>Drop here to remove</span>
      </div>
    </DragDropContext>
  );
}

export default Grid;
