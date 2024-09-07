import './payment.css';
import { Link } from 'react-router-dom'
import { RiErrorWarningFill} from 'react-icons/ri'
const NotFound = () => {
    return(
        <>
        <div className="notfound">
            <RiErrorWarningFill size={60} />
            <h1>Not Found</h1>
              
                
                <div className="profileLink">
                    <Link to="/">Go to Profile</Link>
                </div>
            </div>
        </>
    )
}

export default NotFound;