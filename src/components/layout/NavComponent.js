import React from 'react'
import { Component } from 'react';
import { Navbar, Nav, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container'

function NavComponent() {
    return (
      

        <Container fluid className='justify-content-center text-center navBarStyle d-flex'>

            <Navbar variant="light" expand="sm" className=' fs-3 '>
                <Container fluid>

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
        </Container>

    )
}

export default NavComponent
