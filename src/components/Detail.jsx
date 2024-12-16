import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import {useParams} from 'react-router-dom'
import {db} from '../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Bars } from 'react-loader-spinner'
import Reviews from './Reviews'

const Detail = () => {
  const {id} = useParams();
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rating: 0,
    rated: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    async function getData() {
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data())
      setLoading(false)
    }
    getData();
  },[])

  return (
    loading ? (
      <div className='w-[100vw] h-[80vh] flex justify-center items-center bg-[#121212]'>
          <ThreeDots color='white' width={385} strokeWidth={2} height={20} />
      </div>
  ) : 
  (
    <div className='p-4 mt-4 flex flex-col md:flex-row items-center md:items-start justify-center w-full'>
      {loading ? <div className='h-96 flex w-full justify-center items-center'><Bars height={30} color='white'/></div> :
      <>
      <img className='h-96 block md:sticky top-24' src={data.image}/>
      <div className='ml-0 md:ml-4 w-full md:w-1/2'>
        <h1 className='text-2xl font-bold text-gray-400'>{data.title}<span className='text-xl'>({data.year})</span></h1>
        <ReactStars size={20} half={true} value={data.rating/data.rated} edit={false} />
        <p className='mt-3'>{data.description}</p>

        <Reviews id={id} prevRating={data.rating} userRated={data.rated}/>
      </div>
      </>
    }
    </div>
  )
  )
}

export default Detail
