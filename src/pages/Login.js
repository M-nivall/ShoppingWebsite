import React from 'react';
import { googleLogo,githubLogo } from '../assets';
import { getAuth,GoogleAuthProvider,signInWithPopup,signOut } from "firebase/auth";
import { ToastContainer,toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../redux/bazarSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth();
    const googleAuthProvider = new GoogleAuthProvider();

    googleAuthProvider.setCustomParameters({
        prompt:'select_account'
    });

    const handleGoogleLogin=()=>{
        signInWithPopup(auth, googleAuthProvider)
        .then((result)=>{
            const user = result.user;
            dispatch(addUser({
                _id:user.uid,
                name:user.displayName,
                email:user.email,
                image:user.photoURL,
            }));
            setTimeout(()=>{
                navigate("/")
            }, 800)
        })
        .catch((error)=>{
            //console.log(error);
        })
    };
    const handleSignOut=()=>{
        signOut(auth)
        .then(()=>{
            dispatch(removeUser()); // 🔥 Clear Redux state
            toast.success("Logged out successfully");
        })
        .catch((error)=>{
            console.log(error);
        });
    };
  return (
    <div className='w-full flex flex-col items-center justify-center gap-10 py-20'>
        <div className='w-full flex items-center justify-center gap-10'>
          <div onClick={handleGoogleLogin} className='flex items-center justify-center gap-2 text-base w-60 h-12 tracking-wide border-[1px] border-gray-500 
          rounded-md hover:border-blue-600 cursor-pointer duration-300'>
            <img className='w-8' src={googleLogo} alt='googleLogo'/> 
            <span className='text-sm text-gray-900'>Sign in with Google</span>
          </div>
          <button onClick={handleSignOut} className='bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300'>Sign Out</button>
        </div>
        <div className='w-full flex items-center justify-center gap-10'>
          <div className='flex items-center justify-center gap-2 text-base w-60 h-12 tracking-wide border-[1px] border-gray-500 
          rounded-md hover:border-blue-600 cursor-pointer duration-300'>
            <img className='w-8' src={githubLogo} alt='githubLogo'/> 
            <span className='text-sm text-gray-900'>Sign in with Github</span>
          </div>
          <button className='bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300'>Sign Out</button>
        </div>
        <ToastContainer
        position='top-left'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        />
    </div>
  )
}

export default Login