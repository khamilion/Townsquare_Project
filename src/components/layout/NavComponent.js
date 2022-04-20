import React from 'react'
import { Component } from 'react';
import { Navbar, Nav, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container'
import SignedInLinks from './SignedInLinks';

function NavComponent() {
    return (
        <div className='d-flex justify-content-center '>
            

            <Navbar variant="dark" expand="lg" className='border-top'>
                <Container fluid >
                    <Navbar.Toggle aria-controls="navbarScroll" />

                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>

                            <LinkContainer to="/Home">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="">
                                <Nav.Link>Breakfast</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="">
                                <Nav.Link>Lunch</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="">
                                <Nav.Link>Dinner</Nav.Link>
                            </LinkContainer>

                            
                        </Nav>

                    </Navbar.Collapse>

                </Container>
            </Navbar>
           

            
        </div>
    )
}

export default NavComponent
