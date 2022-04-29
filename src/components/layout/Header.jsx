import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Navbar } from 'react-bootstrap';
import NavComponent from './NavComponent';
import{ useNavigate, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import { useDispatch, useSelector } from 'react-redux'
import {logout, selectUserInfo} from '../../redux/userSlice'

const Header = () => {

    //isAuthenticated state holds boolean value if user is logged in or not
    const {isAuthenticated} = useSelector(selectUserInfo)

     //set up the dispatch hook in order to call any action from any reducer
    const dispatch = useDispatch()

    //logout the user
    const logoutUser = (e) => {
        
        //dispatch the action to fetch the logout endpoint
        dispatch(logout)
    }

    return (  
        <>
        <header>

            <Container fluid className='homehdr justify-content-center pt-4'>

                <Row className='justify-content-center text-center'>
                    <Col>
                        
                            <div className='pt-3'>
                                <nav>
                                    {isAuthenticated 
                                     ? <Link to='/' className='text-dark p-2 border border-primary bg-primary rounded-pill' style={{ textDecoration: 'none' }}> My Profile</Link>
                                     : <Link to='/sign-up' className='text-dark p-2 border border-danger bg-danger rounded-pill' style={{ textDecoration: 'none' }}> Create Account</Link>}
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
                           
                                {isAuthenticated 
                                ? <Button variant="warning" onClick={() => dispatch(logout)} className="rounded-pill"> Log out</Button>
                                : <Link to='/login' className='text-dark p-2 border border-warning bg-warning rounded-pill' style={{ textDecoration: 'none' }}> Log in</Link>}
                                
                                {/*<Link to='/Home' className='text-dark p-2 border border-warning bg-warning rounded-pill' style={{ textDecoration: 'none' }}> Log Out</Link>*/}
                            
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