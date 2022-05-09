import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Navbar } from 'react-bootstrap';
import NavComponent from './NavComponent';
import{ useNavigate, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import { useDispatch, useSelector } from 'react-redux'
import {getUserDetails, logout, selectUserInfo} from '../../redux/userSlice'
import { useEffect } from 'react';

const Header = () => {

    const navigate = useNavigate();

    //isAuthenticated state holds boolean value if user is logged in or not
    const {user, isAuthenticated} = useSelector(selectUserInfo)

     //set up the dispatch hook in order to call any action from any reducer
    const dispatch = useDispatch()

    useEffect(() => {
        //console.log('use Effect Called on initial render');
    
        //Dispatch the action to get all recipes from database
        dispatch(getUserDetails());
      },[]);

      console.log('user' + user, 'auth:'+ isAuthenticated)
    //logout the user
    const logoutUser = (e) => {
        e.preventDefault()
        console.log("Before dispatch")
        //dispatch the action to fetch the logout endpoint
        dispatch(logout())
        //dispatched thunk has an unwrap property which can be called to extract the payload of a fulfilled action or to throw either the error
        .unwrap()
        .then(() => {
          //if the there are no errors navigate to the home page
          //navigate('/Home')
          console.log("after .then")
      })
        .catch((error) => {
          // handle error here
          alert("Please try again: " + error)
        })
    }

    return (  
        <>
        <header>
        <div className='d-flex align-items-center'>
            <Container fluid className='homehdr justify-content-center pt-5'>

                <Row className='justify-content-center text-center'>
                    <Col>
                        
                            <div className='pt-3'>
                                    {isAuthenticated 
                                     ? <Button variant='primary' className='text-dark rounded-pill' size='lg' onClick={() => navigate('/')}> My Profile</Button>
                                     : <Button variant='danger' className='text-dark rounded-pill' size='lg' onClick={() => navigate('/sign-up')}> Create Account</Button>}
                            </div>
                    </Col>

                    <Col xs={8}>
                        <p className='text-light  mb-0' style={{ fontSize: '60px' }}>
                            Food<span className='text-warning'>i</span>
                        </p>
                    </Col>

                    <Col>
                        <div className='pt-3'>
                           
                                {isAuthenticated 
                                ? <Button variant='warning' className='text-dark rounded-pill' size='lg' onClick={(e) => logoutUser(e)}> Log out</Button>
                                : <Button variant='warning' className='text-dark rounded-pill' size='lg' onClick={() => navigate('/login')}> Log in</Button>}
                        </div>
                    </Col>
                </Row>

                
                
            </Container>
        </div>
        </header>
        
        <NavComponent />
    </>
    )
};


export default Header;