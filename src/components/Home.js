import React, { useEffect, useState } from 'react'
import Recipes from './layout/Recipes'
import Header from './layout/Header';

import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes, selectPostsInfo } from '../redux/postSlice';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Navbar } from 'react-bootstrap'

import NavComponent from './layout/NavComponent'
import{ useNavigate, Link } from 'react-router-dom'

import frenchToast from '../images/frenchToast.jpeg'

function Home() {

    useEffect(() => {

    }, []);

    //A selector is a function that takes the entire Redux store state as its argument, reads some value from the state, and returns that result.
   // const {user} = useSelector(selectUserInfo)

    return (
        <>
            <Header />

            <Container fluid className='vh-100'>
                <Row className=" align-items-center ">
                    <Col className=" pt-5 pb-5">
                        <Row className=''> 

                            <Col lg className='text-sm-center text-lg-end'>
                               <img src={frenchToast} alt='French Toast' className='homeImgSize rounded-pill border border-warning  border-4'/>
                            </Col>

                            <Col lg className='d-flex align-items-center justify-content-sm-center justify-content-lg-start'>

                                <Card border="light" className='cards'>
                                    <Card.Title className='fs-1'>
                                        Easy French Toast
                                    </Card.Title>

                                    <Card.Subtitle className=" fs-3 text-muted">
                                        Breakfast
                                    </Card.Subtitle>

                                    <hr/>

                                    <Card.Body className='ps-0'>
                                        <Card.Text className='pb-4' >
                                            Quick and easy french toast recipe. Click below to view ingredients.
                                        </Card.Text>

                                        <Button variant="primary">Go to recipe</Button>
                                        <Button variant="primary ms-2">View all breakfast</Button>
                                    </Card.Body>
                                </Card>

                            </Col>
                        </Row>
                    </Col>
                </Row>
                
                <Row className='bg-dark'>
                    <Col>
                        <div>dkfs</div>
                    </Col>
                </Row>
                
            </Container>



        </>
    )
}



export default (Home)