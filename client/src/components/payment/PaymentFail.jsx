import './payment.css';
import { Link } from 'react-router-dom'
import { RiErrorWarningFill } from 'react-icons/ri'
const PaymentFail = () => {
    return (
        <>
            <div className="notfound">
                <RiErrorWarningFill size={60} />
                <h1>
                    Payment Fail
                </h1>

                <div className="profileLink">
                    <Link to="/subscribe">Try Again</Link>
                </div>
            </div>
        </>
    )
}

export default PaymentFail;