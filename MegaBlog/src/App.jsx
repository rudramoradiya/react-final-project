import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appWrite/auth';
import {login,logout,setAuthLoading} from './store/authSlice';
import { Header,Footer } from './components/index';
import { Outlet } from 'react-router-dom';


import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAuthLoading(true));
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}));
      }
      else{
        dispatch(logout());
      }
    })
    .catch((error) => {
      console.log("Error getting current user:", error);
      dispatch(logout());
    })
    .finally(() => {
      dispatch(setAuthLoading(false));
      setLoading(false);
    });
  }, [dispatch]);
   
  

  return !loading ?(
    <div className='min-h-screen flex flex-col'>
      <div className="w-full flex-1 flex flex-col">
        <Header/>
        <main className='flex-1'>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):null;
}

export default App
