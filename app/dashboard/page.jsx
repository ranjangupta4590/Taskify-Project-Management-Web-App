"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddSheet from "@/components/AddSheet";
import Finished from "@/components/Finished";
import Header from "@/components/Header";
import InProgress from "@/components/InProgress";
import Sidebar from "@/components/Sidebar";
import TaskCard from "@/components/TaskCard";
import ToDo from "@/components/ToDo";
import UnderReview from "@/components/UnderReview";
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

const baseUrl =process.env.NEXT_PUBLIC_API_URL;

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);

  //fetching tasks from newTask route
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/newTask`);
        const tasksData = response.data.data || []; // Ensure tasksData is an array
        // console.log("Fetched tasks:", tasksData);
        setTasks(tasksData);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  //Filter on basis of status
  const toDoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'inprogress');
  const underReviewTasks = tasks.filter(task => task.status === 'underreview');
  const finishedTasks = tasks.filter(task => task.status === 'completed');

  
  
  
  // const handleDragEnd = async (result) => {
  //   if (!result.destination) return;
  
  //   const { source, destination } = result;
  
  //   if (source.droppableId !== destination.droppableId) {
  //     const updatedTasks = [...tasks];
  //     const [movedTask] = updatedTasks.splice(source.index, 1);
  //     movedTask.status = destination.droppableId;
  //     updatedTasks.splice(destination.index, 0, movedTask);
  
  //     setTasks(updatedTasks);
  
  //     try {
  //       const response = await axios.put(`${baseUrl}/api/newTask`, 
  //         { id: movedTask._id, status: movedTask.status },
  //         {
  //           headers: {
  //             'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`, // Use session or local storage to get token
  //           },
  //         }
  //       );
  //       if (response.data.success) {
  //         console.log('Task status updated successfully');
  //       } else {
  //         console.error('Failed to update task status:', response.data.error);
  //       }
  //     } catch (error) {
  //       console.error('Failed to update task status:', error);
  //     }
  //   }
  // };
  
  
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Check if the source and destination are different
    if (source.droppableId !== destination.droppableId) {
      const updatedTasks = [...tasks];
      const [movedTask] = updatedTasks.splice(source.index, 1);
      movedTask.status = destination.droppableId;
      updatedTasks.splice(destination.index, 0, movedTask);

      setTasks(updatedTasks);

      try {
        const response = await axios.put(`${baseUrl}/api/newTask`, 
          { id: movedTask._id, status: movedTask.status },
          {
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`, // Use session or local storage to get token
            },
          }
        );
        if (response.data.success) {
          console.log('Task status updated successfully');
        } else {
          console.error('Failed to update task status:', response.data.error);
        }
      } catch (error) {
        console.error('Failed to update task status:', error);
      }
    }
  };

  

  return (
    <div className="">
      <div className="left-0 h-full relative">
        <Sidebar />
      </div>
      <AddSheet />
      <div className="md:pl-64">
        <Header />
      </div>
      <div className="mt-5 md:pl-64">
        <div className="mx-5 bg-white rounded-md  p-3">
        
        
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
              {/* <div>
                <ToDo tasks={toDoTasks} title="To do" columnId="todo" />
              </div>
              <div>
                <InProgress tasks={inProgressTasks} title="In progress" columnId="inprogress" />
              </div>
              <div>
                <UnderReview tasks={underReviewTasks} title="Under review" columnId="underreview" />
              </div>
              <div>
                <Finished tasks={finishedTasks} title="Finished" columnId="completed" />
              </div> */}
              
              {['todo', 'inprogress', 'underreview', 'completed'].map((columnId) => (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-gray-100 p-3"
                    >
                      {columnId === 'todo' && <ToDo tasks={toDoTasks} title="To do" columnId="todo"/>}
                      {columnId === 'inprogress' && <InProgress tasks={inProgressTasks} title="In progress" columnId="inprogress"/>}
                      {columnId === 'underreview' && <UnderReview tasks={underReviewTasks} title="Under review" columnId="underreview"/>}
                      {columnId === 'completed' && <Finished tasks={finishedTasks} title="Finished" columnId="completed" />}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
              
            </div>
          </DragDropContext>
          
        </div>
      </div>
    </div>
  );
}
