import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Navbar } from 'react-bootstrap';
import NavComponent from './NavComponent';
import{ useNavigate, Link } from 'react-router-dom'

const Header = () => {
    
    return (  
        <>
        <header>

            <Container fluid className='homehdr justify-content-center pt-4'>

                <Row className='justify-content-center text-center'>
                    <Col>
                        <div className='pt-3'>
                            <nav>
                                <Link to='/' className='text-dark p-2 border border-primary bg-primary rounded-pill' style={{ textDecoration: 'none' }}> My Profile</Link>
                            </nav>
                        </div>
                    </Col>

                    <Col xs={8}>
                        <p className='text-light  mb-0' style={{ fontSize: '45px' }}>
                            Food<span className='text-warning'>i</span>
                        </p>
                    </Col>

                    <Col>
                        <div className='pt-3'>
                            <nav>
                                <Link to='/Home' className='text-dark p-2 border border-warning bg-warning rounded-pill' style={{ textDecoration: 'none' }}> Log Out</Link>
                            </nav>
                        </div>
                    </Col>
                </Row>

                <NavComponent />
                
            </Container>

        </header>
    </>
    )
};


export default Header;