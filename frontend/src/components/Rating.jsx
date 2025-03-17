import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
function Rating({ value, text }) {
    return (
        <div className='rating'>
            {
                [1, 2, 3, 4, 5].map((val) => (
                    <span key={val}>
                        {value >= val ? <FaStar /> : value >= val - 1 + 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                    </span>
                ))
            }
            <span className="rating-text">
                {text && text}
            </span>
        </div>
    )
}

export default Rating
