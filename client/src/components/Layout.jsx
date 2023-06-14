import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function () {
  return (
    <div className='flex gap-3 min-h-screen'>
        <Header/>
        <Outlet/>
    </div>
  )
}
