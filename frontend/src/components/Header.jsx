import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/logo.png';

function Header() {
    const { cartItems, } = useSelector((state) => state.cart);
    const { userInfo, } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();
    const logoutHandler = async () => {
        try {
            await logoutApiCall();
            dispatch(logout());
            navigate('/login');
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} alt="Proshop" />
                        ProShop
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <SearchBox />
                            <Nav.Link as={Link} to="/cart">
                                <FaShoppingCart />Cart
                                {
                                    cartItems.length > 0 && (
                                        <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                                            {cartItems.reduce((a, c) => a + c.qty, 0)}
                                        </Badge>
                                    )
                                }
                            </Nav.Link>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <NavDropdown.Item>
                                        <Nav.Link as={Link} to="/profile" style={{ color: 'inherit', padding: '0' }}>
                                            Profile
                                        </Nav.Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (<Nav.Link as={Link} to="/login">
                                <FaUser />Sign In
                            </Nav.Link>)}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <NavDropdown.Item>
                                        <Nav.Link as={Link} to='/admin/productlist' style={{ color: 'inherit', padding: '0' }}>
                                            Products
                                        </Nav.Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Nav.Link as={Link} to='/admin/userlist' style={{ color: 'inherit', padding: '0' }}>
                                            Users
                                        </Nav.Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Nav.Link as={Link} to='/admin/orderlist' style={{ color: 'inherit', padding: '0' }}>
                                            Orders
                                        </Nav.Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
export default Header;
