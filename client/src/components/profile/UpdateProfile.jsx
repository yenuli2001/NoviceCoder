import { useState } from 'react';
import './profile.css';
import {useDispatch} from'react-redux';
import {updateProfile} from '../../redux/actions/profile'
import { useNavigate } from 'react-router-dom';
import Footer from '../layout/Footer'
import backgroundImage from '../../assets/images/img2.jpeg';

const UpdateProfile = ({user}) =>{
    const navigate = useNavigate();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const dispatch = useDispatch();
    const sumbitHandler = (e) =>{
        e.preventDefault();
        dispatch(updateProfile(name, email))
        navigate('/profile')
    }

    return(
        <>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 items-center">
          <img src={backgroundImage} alt="Description of image 2" className="w-full h-48 object-cover"style={{ marginTop: '5px', marginBottom:'20px', paddingLeft:'10px', paddingRight:'10px',height:'300px'}}/>
            <h1 className="mb-6 text-4xl font-bold text-center">Welcome to NoviceCoder!</h1>
        
        <div className="changePasswordContainer h-screen pt-16 pb-32 bg-gradient-to-r from-blue-500 to-purple-600 items-center">
            <form onSubmit={sumbitHandler} className="space-y-4 bg-indigo-200 text-center border border-gray rounded-lg shadow-lg" style={{paddingTop: '50px', paddingBottom:'100px', margin:'20px', paddingLeft:'20px', paddingRight:'20px'}}>
            <h1 className="text-3xl font-bold text-center mb-6 text-black-800 ">Update Profile</h1>
                <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <button type='submit' className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105">Update Profile</button>
            </form>
            </div>
            </div>
        <Footer/>
        </>
    )
}

export default UpdateProfile;