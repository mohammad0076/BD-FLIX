import React, { useState } from 'react';
import { AiOutlineArrowRight } from "react-icons/ai"
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './MovieForyou.css';

const MoviesForYou = () => {

    const navigate = useNavigate();


    const PopularMovies = [
        {
            "name": "Avengers",
            "PhotoUrl": "https://i.ibb.co/rs5DVjP/avenger1.png"
        },
        {
            "name": "Panther",
            "PhotoUrl": "https://i.ibb.co/N34wFcF/Panther2.png"
        },
        {
            "name": "Bizli",
            "PhotoUrl": "https://i.ibb.co/KDNWn2h/Bizli3.png"
        },
        {
            "name": "Pashan",
            "PhotoUrl": "https://i.ibb.co/K9n2VsZ/pasan4.png"
        },
        {
            "name": "Movie Name",
            "PhotoUrl": "https://i.ibb.co/rs5DVjP/avenger1.png"
        },
        {
            "name": "Movie Name",
            "PhotoUrl": "https://i.ibb.co/rs5DVjP/avenger1.png"
        },
        {
            "name": "Movie Name",
            "PhotoUrl": "https://i.ibb.co/rs5DVjP/avenger1.png"
        },
        {
            "name": "Movie Name",
            "PhotoUrl": "https://i.ibb.co/rs5DVjP/avenger1.png"
        }
    ]

    const [arrowButtonVisibility, setArrowButtonVisibility] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevSlide = () => {
        setCurrentIndex(currentIndex - 1);
    };

    const handleNextSlide = () => {
        setCurrentIndex(currentIndex + 1);
    };

    
    const handleClickVideo = (movie) => {
        navigate('/clickedvideo', { state: { movie } })
    }

    return (
        <div className='relative ml-8'>
            <div className='flex justify-between mb-3'>
                <h1 className='text-md font-bold text-white'>Movies For You</h1>
                <p className='text-white inline'>See all <AiOutlineArrowRight className='inline text-red-500'></AiOutlineArrowRight></p>
            </div>
            <>

                <div className="carousel carousel-center space-x-4 lg:h-[30vh] h-[30vh]"
                    onMouseEnter={() => setArrowButtonVisibility(true)}
                    onMouseLeave={() => setArrowButtonVisibility(false)}
                >
                    <div className="carousel-item">
                        {
                            PopularMovies.map((images, index) => (
                                <div  onClick={() => handleClickVideo(images.name)}
                                    key={index}
                                    className={`carousel-item cursor-pointer ${index === currentIndex ? 'active' : ''}`}
                                    style={{
                                        transform: `translateX(${-100 * currentIndex}%)`,
                                        transition: 'transform 0.3s ease-in-out',
                                    }}>

                                    <div className="relative w-full lg:h-[190px] h-[200px] overflow-hidden mr-5 cursor-pointer carousel-item">
                                        <div className='relative transition-transform duration-300 ease-in-out transform hover-zoom'>
                                            <img
                                                className='rounded-md object-cover lg:w-full w-full lg:h-[190px] h-[120px]'
                                                src={images.PhotoUrl} alt=''
                                            ></img>
                                            <div className="movie-for-you-gradient absolute bottom-0 left-0 w-full h-2/6"></div>
                                        </div>

                                        <h2 className="absolute bottom-[8%] text-center md:text-lg text-white mx-2 ">{images.name}</h2>

                                    </div>
                                </div>
                            ))
                        }

                        <button
                            className={`lg:block hidden absolute top-[40%] bg-white text-red-700 rounded-full left-0 p-4 ${arrowButtonVisibility ? '' : 'hidden'}`}
                            onClick={handlePrevSlide}
                        >
                            <FaAngleLeft />
                        </button>


                        <button
                            className={`lg:block hidden absolute top-[40%] bg-white rounded-full right-0 text-red-700 p-4 ${arrowButtonVisibility ? '' : 'hidden'}`}
                            onClick={handleNextSlide}
                        >
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

            </>
        </div>
    );
};

export default MoviesForYou;