import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='sticky top-0 z-10 bg-black header text-3xl flex justify-between text-red-500 font-bold p-3 border-b-2 border-gray-500'>
      <Link to={'/'}><span>Filmy<span className='text-white'>Verse</span></span></Link>
      <Link to={'/addmovie'}><Button><h1 className='text-lg text-white cursor-pointer flex items-center'><AddIcon className='mr-1'/>Add New</h1></Button></Link>
    </div>
  )
}

export default Header