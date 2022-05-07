import React from 'react'
import { Component } from 'react';
import { Navbar, Nav, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container'

function NavComponent() {
    return (
      
       
            <Navbar sticky='top' variant="light" expand="sm" className='navBarStyle fs-5 '>

                <Container fluid className='justify-content-center text-center'>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>

                            <LinkContainer to="/home">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/breakfast">
                                <Nav.Link>Breakfast</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/lunch">
                                <Nav.Link>Lunch</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/dinner">
                                <Nav.Link>Dinner</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/all-recipes">
                                <Nav.Link>All Recipes</Nav.Link>
                            </LinkContainer>
                        </Nav>

                    </Navbar.Collapse>

                </Container>

            </Navbar>
       
    )
}

export default NavComponent
