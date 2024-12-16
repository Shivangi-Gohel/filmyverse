import React, { useEffect, useState } from 'react'
import { Audio, ThreeDots } from 'react-loader-spinner';
import ReactStars from 'react-stars';
import {doc, getDocs, addDoc } from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Cards = ({id}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(moviesRef);
                const _data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setData(_data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [])

    return (
        <div className='flex flex-wrap justify-between px-3 mt-2'>
            {loading ? (
                <div className='w-[100vw] h-[80vh] flex justify-center items-center'>
                <ThreeDots color='white' width={385} strokeWidth={2} height={20} />
            </div>
            ) : (
                <>
                {data.map((e, i) => {
                    return(
                        <Link to={`/detail/${e.id}`}>
                            <div key={i} className='card shadow-lg p-2 rounded-lg hover:-translate-y-2 cursor-pointer font-medium mt-6 mr-4 transition-all duration-500'>
                                <img className='h-60 md:h-72 object-cover w-full' src={e.image} />
                                <h1 className='text-sm md:text-base'><span className='text-gray-500'>Name:</span> {e.title}</h1>
                                <h1 className='flex items-center text-sm md:text-base'><span className='text-gray-500 mr-1'>Rating:</span>
                                <ReactStars 
                                    size={20} 
                                    half={true}
                                    value={e.rating/e.rated} 
                                    edit={false} /></h1>
                                <h1><span className='text-sm md:text-base text-gray-500'>Year:</span> {e.year}</h1>
                            </div>
                        </Link>
                    )
                })}
                </>
            )}
        </div>
    );
}

export default Cards
