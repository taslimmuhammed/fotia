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
    return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand to="#home"><div className="n1">Fotia</div></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
   
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
