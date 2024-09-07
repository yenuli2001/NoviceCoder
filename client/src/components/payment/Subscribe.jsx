import './payment.css';
import Footer from '../layout/Footer'
import backgroundImage from '../../assets/images/img2.jpeg';

const Subscribe = () => {
    return (
        <>
           <div className="bg-gradient-to-r from-blue-500 to-purple-600 items-center">
          <img src={backgroundImage} alt="Description of image 2" className="w-full h-48 object-cover"style={{ marginTop: '5px', marginBottom:'20px', paddingLeft:'10px', paddingRight:'10px',height:'300px'}}/>
            <h1 className="mb-6 text-4xl font-bold text-center">Welcome to NoviceCoder!</h1>
            <div className="h-screen pt-16 pb-32 bg-gradient-to-r from-blue-500 to-purple-600 items-center">
                <div className="subscribeContainer space-y-4 bg-indigo-200 text-center border border-gray rounded-lg shadow-lg" style={{ paddingTop: '50px', paddingBottom: '50px', paddingLeft: '50px', paddingRight: '50px' }}>
                    <h1 className="text-3xl font-bold text-center mb-6 text-black-800">Subscription</h1>
                    <div className="subscribebox" >
                        <div className="subscribeHead ">
                            <p>Pro Pack - $99.00</p>
                        </div>
                        <div className="subscribeContent">
                            <p>Join pro pack and get access to all content.
                                All-in-one platform for creating engaging.
                            </p>
                            <h3>$99 Only</h3>
                        </div>
                        <div className="subscribeBtn">
                            <button>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <Footer />
        </>
    )
}

export default Subscribe;