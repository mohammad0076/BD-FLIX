import React, { useState } from 'react';
import './poster.css';
import { AiOutlineArrowRight } from "react-icons/ai"
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MostPopular = () => {
    const [loading, setLoading] = useState(false);
    const [MostPopular, setMostPopular] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        setLoading(true);
        fetch('https://bd-flix-server-i4wbktqxf-mohammad0076.vercel.app/allmovie/romantic')
            .then(res => res.json())
            .then(res => {
                setMostPopular(res)
                setLoading(false)
            })
    }, [])

    const handleNavigate = (route) => {
        navigate('/categoryVideo',  { state:  route  } )
    }


    return (
        <>
            <div className='lg:my-2 p-4'>
                <div className='flex justify-between mb-3'>
                    <h1 className='text-md font-bold text-current text-white'>Romantic</h1>

                    <button  onClick={() => handleNavigate('romantic')}  className='text-white inline'>See all <AiOutlineArrowRight className='inline text-red-500'></AiOutlineArrowRight></button >
                </div>

                <>
                    {
                        loading ? "Loding..." : <div className="carousel carousel-center lg:h-[20vw] h-full"
                           >
                            <div className="carousel-item">
                                {
                                    MostPopular.map((images, index) => (

                                        <div
                                            
                                            className={`carousel-item cursor-pointer`}
                                           >

                                            <Link to={`/clickedvideo/${images.id}`} className="carousel-item mr-2 overflow-hidden">
                                                <div className=' relative transition-transform duration-300 ease-in-out transform hover-zoom items'>

                                                    <img
                                                        className='object-cover rounded-sm lg:h-full h-[200px] w-full'
                                                        src={images.poster_path} alt=''
                                                    ></img>
                                                    <div className=" absolute bottom-0 left-0 w-full h-2/6"></div>
                                                </div>

                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </>
            </div>
        </>
    );
};

export default MostPopular;