"use client";
import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const onDragEnd = async (result, tasks, setTasks) => {
  const { source, destination, draggableId } = result;

  // Check if destination exists
  if (!destination) return;

  // Check if the item was dropped in the same place
  if (source.droppableId === destination.droppableId && source.index === destination.index) return;

  // Get the updated task status
  const updatedStatus = destination.droppableId;

  // Update the local state
  const updatedTasks = tasks.map(task =>
    task._id === draggableId ? { ...task, status: updatedStatus } : task
  );
  setTasks(updatedTasks);

  // Update the backend
  try {
    await axios.patch(`${baseUrl}/api/newTask/${draggableId}`, { status: updatedStatus });
  } catch (error) {
    console.error('Error updating task status:', error);

    // Revert state if the update fails
    setTasks(tasks);
  }
};

const DragDropProvider = ({ children, tasks, setTasks }) => {
  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, tasks, setTasks)}>
      {children}
    </DragDropContext>
  );
};

export default DragDropProvider;
