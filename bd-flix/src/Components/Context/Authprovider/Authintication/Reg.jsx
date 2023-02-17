import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Authprovider';
import jugle from '../../../../images/jugle.jpg';
import { toast } from 'react-toastify';
import useTitle from '../../../../Hooks/UseTitle/UseTitle';
import { setAuthToken } from '../../../../Token/AuthToken';
import { success } from 'daisyui/src/colors';


const Reg = () => {


    const [loading, setloading] = useState(false)

    useTitle('Signup')
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [error, setError] = useState('')




    const { createUser, updateUserProfile, verifyEmail } = useContext(AuthContext)
    const handlesignup = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const name = form.name.value;
        const password = form.password.value;


        //for image upload
        const image = event.target.image.files[0];
        const formData = new FormData()
        formData.append('imageFile', image)
        setloading(true)

        const url = "http://localhost:5000/uploadPhoto"

        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imageData => {

                createUser(email, password)
                    .then(result => {
                        const user = result.user;
                        // console.log(user);
                        setError('');
                        navigate('/')
                        form.reset();
                        saveUser(name, email, imageData.url)
                        handleUpdateUserProfile(name, email, imageData.url);
                        handleEmailVerification();
                        toast.success('Please verify your email address.')
                    })
                    .catch(error => {
                        console.error(error);
                        setError(error.message);


                        if (error.code == "auth/email-already-in-use") {
                            toast("The email address is already in use");
                            setloading(false)
                        } else if (error.code == "auth/invalid-email") {
                            toast.error("The email address is not valid.");
                            setloading(false)
                        } else if (error.code == "auth/operation-not-allowed") {
                            toast.error("Operation not allowed.");
                            setloading(false)
                        } else if (error.code == "auth/weak-password") {
                            toast.error("The password is too weak.");
                            setloading(false)
                        }
                    });

            }).catch(error => console.error(error))






  const [loading, setloading] = useState(false)
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setDeviceId(data.ip);
      });
  }, []);

  useTitle('Signup')
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [error, setError] = useState('')




  const { createUser, updateUserProfile, verifyEmail } = useContext(AuthContext)
  const handlesignup = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const name = form.name.value;
    const password = form.password.value;


    //for image upload
    const image = event.target.image.files[0];
    const formData = new FormData()
    formData.append('imageFile', image)
    setloading(true)

    const url = "https://bd-flix-server-emonkumardas.vercel.app/uploadPhoto"

    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(imageData => {

        createUser(email, password)
          .then(result => {
            const user = result.user;
            
            setError('');
            navigate('/')
            form.reset();
            saveUser(name, email, imageData.url)
            handleUpdateUserProfile(name, email, imageData.url);
            handleEmailVerification();
            toast.success('Please verify your email address.')
          })
          .catch(error => {
            console.log(error);
            setError(error.message);


            if (error.code == "auth/email-already-in-use") {
              toast("The email address is already in use");
              setloading(false)
            } else if (error.code == "auth/invalid-email") {
              toast.error("The email address is not valid.");
              setloading(false)
            } else if (error.code == "auth/operation-not-allowed") {
              toast.error("Operation not allowed.");
              setloading(false)
            } else if (error.code == "auth/weak-password") {
              toast.error("The password is too weak.");
              setloading(false)
            }
          });

      }).catch(error => console.log(error))
  }




  const handleUpdateUserProfile = (name, email, photoURL) => {
    const profile = {
      displayName: name,
      photoURL: photoURL

    }

    updateUserProfile(profile)
      .then(() => {

        saveUser(name, email, photoURL)

      })
      .catch(error => console.error(error));
  }

  const handleEmailVerification = () => {
    verifyEmail()
      .then(() => { })
      .catch(error => console.error(error));
  }

  const saveUser = (name, email, photoURL) => {
    const user = { name, email, photoURL, deviceId };
    fetch('https://bd-flix-server-emonkumardas.vercel.app/allUsers', {

      method: "POST",
      headers: {
        'content-type': 'application/json',

      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        
        getUserToken(email)
      })
  }



  const getUserToken = email => {
   
    fetch(`https://bd-flix-server-emonkumardas.vercel.app/jwt?email=${email}`)
      .then(res => res.json())
      .then(data => {
        if (data.ACCESS_TOKEN) {
          localStorage.setItem('accessToken', data.ACCESS_TOKEN);
          navigate('/')
        }


        updateUserProfile(profile)
            .then(() => {

                saveUser(name, email, photoURL)

            })
            .catch(error => console.error(error));
    }

    const handleEmailVerification = () => {
        verifyEmail()
            .then(() => { })
            .catch(error => console.error(error));
    }



    const saveUser = (name, email, photoURL) => {
        const user = { name, email, photoURL };
        fetch('http://localhost:5000/allUsers', {

            method: "POST",
            headers: {
                'content-type': 'application/json',

            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {

                getUserToken(email)
            })
    }



    const getUserToken = email => {
        console.error(email, 'getuser')
        fetch(`http://localhost:5000/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data.ACCESS_TOKEN) {
                    localStorage.setItem('accessToken', data.ACCESS_TOKEN);
                    navigate('/')
                }
            });
    }



    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content md:grid-cols-2 flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                    <p className="py-6">I know all about this. For years I have been continuously improving, accumulating knowledge and experience.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handlesignup} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="name" type="text" placeholder="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image</span>
                            </label>
                            <input name="image" type="file" id="image" accept="image/*" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="text" placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="password" className="input input-bordered" required />

                        </div>
                        <div className="form-control mt-6">
                            {/* text-green-700 hover:text-green-400 lg:text-3xl focus:outline-none  */}
                            <input type="submit" className="btn btn-primary text-green-700 hover:text-green-400 lg:text-2xl  focus:outline-none " value={loading ? "loading..." : 'Signup'} />

                        </div>

                    </form>
                    <p className='text-center my-5'>Already have BDFLIX account?
                        <Link className="label-text-alt link link-hover text-green-700 font-bold py-10 " to='/login'>Login</Link></p>
                </div>
            </div >
        </div >
    );

      });
  }



  return (
    <div className="hero min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${jugle})` }}>
      <div className="hero-content md:grid-cols-2 lg:flex-row-reverse p-10">
        <div className="card shadow-lg rounded-lg w-full max-w-sm mx-auto">
          <form onSubmit={handlesignup} className="bg-[#060815] p-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign up for BDFLIX</h2>
            <div className="form-control">
              <label htmlFor="name" className="label">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                className="input input-bordered bg-transparent w-full focus:outline-none"
              />
            </div>
            <div className="form-control">
              <label htmlFor="image" className="label">Image</label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="input input-bordered bg-transparent w-full focus:outline-none p-2"
              />
            </div>
            <div className="form-control">
              <label htmlFor="email" className="label">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email"
                className="input bg-transparent input-bordered w-full focus:outline-none"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="password" className="label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="input bg-transparent input-bordered w-full focus:outline-none"
                required
              />
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                className="btn bg-transparent btn-primary w-full text-white hover:bg-green-500 focus:outline-none"
                value={loading ? "Loading..." : "Sign up"}
              />
            </div>
            <p className='text-center my-5'>
              Already have a BDFLIX account?
              <Link
                to='/login'
                className="link link-hover font-bold text-green-500 underline"
              >
                Login
              </Link>
            </p>
          </form>

        </div>
      </div>
    </div>

  );

};

export default Reg;