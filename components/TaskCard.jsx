"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from './ui/card';
import { ClipboardPenLine, Clock3, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';

const TaskCard = ({ projects , onEdit, onDelete}) => {

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
    } catch (error) {
      console.error('Failed to delete task:', error);
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
                
                <button onClick={() => handleEdit(item)}><ClipboardPenLine className='h-4 w-4 mt-3 '/></button>
                <button onClick={() => handleDelete(item._id)}><Trash2 className='h-4 w-4 mt-3'/></button>
                </div>
              </div>
            </CardContent>
          </Card>
      ))}
    </>
  );
};

export default TaskCard;
