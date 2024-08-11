import { BallTriangle } from 'react-loader-spinner'
import "./spinner.scss";



const Spinner = () => {
    return (
        <div className='spinner'>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#352764"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Spinner
