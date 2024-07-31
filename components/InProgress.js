"use client"
import React, { useState } from 'react'
import { Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { Button } from './ui/button';
import { useSheet } from '@/context/SheetContext';
import { ChartNoAxesColumnIncreasing, Plus } from 'lucide-react';

const InProgress = ({tasks,title,columnId }) => {
    const { openSheet } = useSheet();
    
    const [taskList, setTaskList] = useState(tasks);

    const handleEdit = (task) => {
        openSheet('todo', task);
    };

    const handleDelete = (taskId) => {
        setTaskList(taskList.filter(task => task._id !== taskId));
    };
    
    
    
    
    
    
    return (
        <div>
            <div className='flex justify-between mx-5 text-zinc-500'>
                <div><h1 className='font-semibold'>{title}</h1></div>
                <div><ChartNoAxesColumnIncreasing size={20} className="transform rotate-90" /></div>
            </div>
            {/* <div className='my-3 mx-5'>
                <TaskCard tasks={tasks} />
            </div> */}
            <Droppable droppableId={columnId}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className='my-3 mx-5'>
                        {tasks.map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <TaskCard projects={[task]}  onEdit={handleEdit} onDelete={handleDelete}/>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <div className="flex justify-between mx-5">
                <Button onClick={() => openSheet('inprogress')} className='flex text-white rounded-lg w-full shadow-lg justify-between '>Add new <Plus className="w-5 h-5 ml-2 text-white text-right" /></Button>
            </div>
        </div>
    )
}

export default InProgress;