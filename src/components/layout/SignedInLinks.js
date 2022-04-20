import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Button } from 'react-bootstrap';


function SignedInLinks() {
    return (
            <>
                <LinkContainer to="/">
                    <Nav.Link>my profile</Nav.Link>
                </LinkContainer>
               
             </>
    )
}

export default SignedInLinks
