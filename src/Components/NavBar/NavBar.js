import React from 'react'
import { Navbar ,Container,Offcanvas ,Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import './NavBar.css'
import { AuthContext , FireBaseContext} from '../../store/FireBaseContext';
import { useHistory } from 'react-router';
import { useContext, useState } from 'react';

function ProNav() {
  const history = useHistory();
  const {user} = useContext(AuthContext);
  const {firebase} = useContext(FireBaseContext);
  // const HandleClick=()=>{
  //   firebase.auth().signOut().then(() => {
  //     history.push("/login")
  //   }).catch((error) => {
  //     console.log(`Error Occured. Could'nt SignOut`)
  //   });
  //   history.push("/signup");
  // }
    return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand to="#home"><div className="n1">Fotia</div></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    {/* <Form className="d-flex n2">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form> */}
      {/* <Nav className="me-auto">
        <Nav.Link to="#" >About</Nav.Link>
        <Nav.Link to="/myproducts">Your_Cases</Nav.Link>
        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
          <NavDropdown.Item to="#">Action</NavDropdown.Item>
          <NavDropdown.Item to="#">Another action</NavDropdown.Item>
          <NavDropdown.Item to="#">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item to="#">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav> */}
      <Nav className="nav1">
        <Nav.Link to="#" >About</Nav.Link>
        <Nav.Link eventKey={2}  to="myproducts" onClick={()=>history.push('/myproducts')}>
          Your_Cases
        </Nav.Link>
        {user?
        <Nav.Link to="/signup" onClick={
         ()=>{
          firebase.auth().signOut().then(() => {
              history.push("/login")
               }).catch((error) => {
                 console.log(`Error Occured. Could'nt SignOut`)
               });
              //  history.push("/signup");
         }
        }>Log_Out</Nav.Link>:
        <Nav.Link to="/login" onClick={()=>history.push('/login')}>LogIn</Nav.Link>}
        {user?
        <Nav.Link to="#" ><div className="s1">{user.displayName}</div></Nav.Link>:
        <Nav.Link to="/signup"  onClick={()=>history.push('/signup')}><div className="s1">SignUp</div></Nav.Link>}
      </Nav>
     
    </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default ProNav
