import { useState } from "react"
import { Form, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
function SearchBox() {
    const { keyword: urlKeyword } = useParams();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            setKeyword('');
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    }
    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                type='text'
                className='mr-sm-2 ml-sm-5'
                name='q'
                placeholder='Search Product...'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button type='submit' variant='outlin-light' className='p-2 mx-2 text-light'>
                Search
            </Button>
        </Form>
    )
}

export default SearchBox
