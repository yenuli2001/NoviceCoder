import { useEffect, useState } from "react";
import './login.css';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { resetPassword } from "../../redux/actions/user";

const ResetPassword = () => {
    const [password, setPassword] = useState('');

    const params = useParams();
    const navigate = useNavigate();
  
    const { message, error } = useSelector(state => state.profile);
  
    const dispatch = useDispatch();
    const submitHandler = e => {
      e.preventDefault();
      dispatch(resetPassword(params.token, password));
    };
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: 'clearError' });
      }
      if (message) {
        toast.success(message);
        navigate('/login');
        dispatch({ type: 'clearMessage' });
      }
    }, [dispatch, error, message, navigate]);
  
    return (
        <>
            <div className="loginContainer">
                <h1>Reset Password</h1>
                <form onSubmit={submitHandler}>
                    <input type="password" placeholder='New Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type='submit'>Reset Password</button>
                </form>
            </div>
        </>
    )
}

export default ResetPassword;