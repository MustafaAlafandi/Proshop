import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Paginate({ pages, page, isAdmin = false, keyword = "" }) {
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <Pagination.Item as={Link} active={x + 1 === page} key={x} to={
                        !isAdmin ? keyword ? `/search/${keyword}/page/${x + 1}` :
                            `/page/${x + 1}` :
                            `/admin/productlist/${x + 1}`
                    }>
                        {x + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        )
    )
}

export default Paginate
