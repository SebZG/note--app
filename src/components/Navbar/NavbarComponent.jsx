import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/init';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './NavbarComponent.css';

const NavbarComponent = () => {
   const navigate = useNavigate();

   const handleLogOut = () => {
      signOut(auth);
      navigate("/");
   }

   return (
      <Navbar fixed='top' expand="md" className='bg-primary'>
         <Container fluid>
            <Navbar.Brand as={Button} style={{cursor: "pointer"}} onClick={() => navigate("/")} className='text-white'>Notes App</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
               <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: '100px' }}
                  navbarScroll
               >
                  <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
                  <NavDropdown title="Links" id="navbarScrollingDropdown">
                     <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                     <NavDropdown.Item href="#action4">
                        Another action
                     </NavDropdown.Item>
                     <NavDropdown.Divider />
                     <NavDropdown.Item href="#action5">
                        Something else here
                     </NavDropdown.Item>
                  </NavDropdown>
               </Nav>
               <Form className="d-flex">
                  <Form.Control
                     type="search"
                     placeholder="Search"
                     className="me-2"
                     aria-label="Search"
                  />
                  {/* <Button variant="outline-warning">Search</Button> */}
               </Form>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   )
}
export default NavbarComponent;