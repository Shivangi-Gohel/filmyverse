import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import {useParams} from 'react-router-dom'
import {db} from '../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'

const Detail = () => {
  const {id} = useParams();
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: ""
  });
  
  useEffect(() => {
    async function getData() {
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      console.log(_data)
      setData(_data.data)
    }
    getData();
  },[])

  return (
    <div className='p-4 mt-4 flex flex-col md:flex-row items-center md:items-start justify-center w-full'>
      <img className='h-96 block md:sticky top-24' src={data.image}/>
      <div className='ml-0 md:ml-4 w-full md:w-1/2'>
        <h1 className='text-2xl font-bold text-gray-400'>{data.title}<span className='text-xl'>({data.year})</span></h1>
        <ReactStars size={20} half={true} value={4.5} edit={false} />
        <p className='mt-3'>{data.description}</p>
      </div>
    </div>
  )
}

export default Detail