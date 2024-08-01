"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipboardPenLine, Clock3, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast, Toaster } from 'react-hot-toast';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './ui/tooltip';
import { Card, CardContent, CardDescription } from './ui/card';

const TaskCard = ({ projects, onEdit, onDelete }) => {

  if (!projects || projects.length === 0) {
    return <p>No tasks available.</p>; // Return a message if tasks are not available
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-orange-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleEdit = (item) => {
    if (onEdit) onEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/newTask`, { data: { id } });
      if (onDelete) onDelete(id);
      toast.success('Task Deleted successfully!', {
        style: {
          background: 'green',
          color: 'white',
        },
      });
      // window.location.reload();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast.error('Failed to save task', {
        style: {
          background: 'red',
          color: 'white',
        },
      });
    }
  };

  return (
    <>
      {projects.map((item) => (
          <Card key={item._id} className='bg-zinc-400/10 my-3'>
            <CardContent className='p-3'>
              <CardDescription>
                <p className='text-md font-semibold text-zinc-500'>{item.title}</p>
                <p className='text-sm text-zinc-400'>{item.description}</p>
              </CardDescription>
              <button className={`text-white p-1 rounded-md text-xs mt-2 ${getPriorityColor(item.priority)}`}>{item.priority}</button>
              <p className='flex gap-2 text-zinc-500 text-xs mt-2'><Clock3 className='h-4 w-4 mt-0' />{item.deadline ? new Date(item.deadline).toLocaleDateString() : 'No deadline'}</p>
              <div className='flex justify-between'>
                <div>
                  <p className='text-zinc-400 text-xs text-left mt-3'>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</p>
                </div>
                <div className='flex gap-2 text-zinc-600'>

                  {/* <button data-tip="Edit Task" onClick={() => handleEdit(item)}><ClipboardPenLine className='h-4 w-4 mt-3 ' /></button>
                  <button data-tip="Delete Task" onClick={() => handleDelete(item._id)}><Trash2 className='h-4 w-4 mt-3' /></button> */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <button onClick={() => handleEdit(item)}>
                          <ClipboardPenLine className='h-4 w-4 mt-3' />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className='text-white'>
                        <p>Edit Task</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <button onClick={() => handleDelete(item._id)}>
                          <Trash2 className='h-4 w-4 mt-3' />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className='text-white'>
                        <p>Delete Task</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardContent>
          </Card>
          
      ))}
      <Toaster/>
    </>
  );
};

export default TaskCard;
