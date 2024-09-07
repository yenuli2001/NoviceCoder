import { useEffect, useState } from 'react';
import './profile.css';
import {changepassword} from '../../redux/actions/profile'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Footer from '../layout/Footer';
import backgroundImage from '../../assets/images/img2.jpeg';



const ChangePassword =() =>{
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const dispatch = useDispatch();

    const { message, error } = useSelector((state) => state.profile)

    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: 'clearError' });
      }
      if (message) {
        toast.success(message);
        dispatch({ type: 'clearMessage' });
      }
    }, [dispatch, error, message]);
  
    const changePassword = (e) =>{
        e.preventDefault();
        dispatch(changepassword(oldPassword, newPassword))
    }

    return(
        <>
        <div className='bg-gradient-to-r from-blue-500 to-purple-600 items-center'>
          <img src={backgroundImage} alt="Description of image 2" className="w-full h-48 object-cover"style={{ marginTop: '5px', marginBottom:'20px', paddingLeft:'10px', paddingRight:'10px',height:'300px'}}/>
            <h1 className="mb-6 text-4xl font-bold text-center">Welcome to NoviceCoder!</h1>
        
        <div className="changePasswordContainer h-screen pt-16 pb-32 bg-gradient-to-r from-blue-500 to-purple-600 items-center">
            <form onSubmit={changePassword} className="space-y-4 bg-indigo-200 text-center border border-gray rounded-lg shadow-lg" style={{paddingTop: '50px', paddingBottom:'100px', margin:'20px', paddingLeft:'20px', paddingRight:'20px'}}>
            <h1 className="text-3xl font-bold text-center mb-6 text-black-800 ">Change Password</h1>
                <input type="password" placeholder='Old Password' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
                <input type="password" placeholder='New Password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                <button type='submit' className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105">Change</button>
            </form>
        </div>
        </div>
        <Footer/>
        </>
    )
}

export default ChangePassword;