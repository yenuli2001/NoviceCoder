import './payment.css';
import {RiCheckboxCircleFill} from 'react-icons/ri'
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
    return(
        <>
        <div className="subscribeContainer">
            <h1>Have been Subscribed</h1>
            <div className="subscribebox">
                <div className="subscribeHead">
                    <p>Payment success</p>
                </div>
                <div className="subscribeContent">
                    <p>
                        Congratulation you're a pro member. 
                        You have access to premium content now.
                    </p>
                    <div className="successIcon">
                    < RiCheckboxCircleFill />
                    </div>
                </div>
                <div className="profileLink">
                    <Link to="/">Go to Profile</Link>
                    <h3>Reference: 24r3345</h3>
                </div>
            </div>
        </div>
        </>
    )
}

export default PaymentSuccess;