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
import Carousel from 'react-bootstrap/Carousel'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf, faUtensils, faHamburger } from '@fortawesome/free-solid-svg-icons'


import NavComponent from './layout/NavComponent'
import{ useNavigate, Link } from 'react-router-dom'

import frenchToast from '../images/frenchToast.jpeg'
import burrito from '../images/vegetarian-bean-and-rice-burrito-recipe.jpg'
import shrimpFajitas from '../images/Shrimp-Fajitas.jpg'
import Footer from './layout/Footer';

function Home() {

    useEffect(() => {

    }, []);

    //A selector is a function that takes the entire Redux store state as its argument, reads some value from the state, and returns that result.
   // const {user} = useSelector(selectUserInfo)

    return (
        <>
            <Header />

            <Container fluid className='' style={{height:'70vh'}}>
                <Carousel variant="dark" className='' style={{minHeight:'70%'}}>   
                    <Carousel.Item interval={5000}>
                        <Row className=" align-items-center ">

                            <Col className=" pt-5 pb-5">
                                <Row>


                                    <Col lg className='text-sm-center text-lg-end'>
                                        <img src={frenchToast} alt='French Toast' className='homeImgSize breakfastThemeHome ' />
                                    </Col>

                                    <Col lg className='d-flex align-items-center justify-content-sm-center justify-content-lg-start'>

                                        <Card border="light" className='cardHome'>
                                            <Card.Title className='fs-1'>
                                                Easy French Toast
                                            </Card.Title>

                                            <Card.Subtitle className=" fs-3 text-muted">
                                                Breakfast
                                            </Card.Subtitle>

                                            <hr />

                                            <Card.Body className='ps-0'>
                                                <Card.Text className='mb-4' >
                                                    Quick and easy french toast recipe. 

                                                </Card.Text>

                                                <Card.Text className='pb-4' >
                                                    Click below to view ingredients.
                                                </Card.Text>

                                                <button type='button' className='breakfastButton'>Go to recipe</button>
                                                <Button variant="outline-dark ms-2">View all breakfast</Button>
                                            </Card.Body>
                                        </Card>

                                    </Col>


                                </Row>
                            </Col>

                        </Row>
                    </Carousel.Item>

                    <Carousel.Item interval={5000}>
                        <Row className=" align-items-center ">

                            <Col className=" pt-5 pb-5">
                                <Row className=''>


                                    <Col lg className='text-sm-center text-lg-end'>
                                        <img src={burrito} alt='Bean and Rice Burrito' className='homeImgSize rounded-pill border border-success  border-4' />
                                    </Col>

                                    <Col lg className='d-flex align-items-center justify-content-sm-center justify-content-lg-start'>

                                        <Card border="light" className='cardHome'>
                                            <Card.Title className='fs-1'>
                                                Bean and Rice Burrito
                                            </Card.Title>

                                            <Card.Subtitle className=" fs-3 text-muted">
                                                Lunch
                                            </Card.Subtitle>

                                            <hr />

                                            <Card.Body className='ps-0'>
                                                <Card.Text className='mb-4' >
                                                    Quick and easy burrito recipe.
                                                </Card.Text>

                                                <Card.Text className='pb-4' >
                                                    Click below to view ingredients.
                                                </Card.Text>

                                                <Button variant="success">Go to recipe</Button>
                                                <Button variant="outline-dark ms-2">View all lunch</Button>
                                            </Card.Body>
                                        </Card>

                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Carousel.Item>

                    <Carousel.Item interval={5000}>
                        <Row className=" align-items-center ">

                            <Col className=" pt-5 pb-5">
                                <Row className=''>


                                    <Col lg className='text-sm-center text-lg-end'>
                                        <img src={shrimpFajitas} alt='Shrimp Fajitas' className='homeImgSize rounded-pill border border-warning  border-4' />
                                    </Col>

                                    <Col lg className='d-flex align-items-center justify-content-sm-center justify-content-lg-start'>

                                        <Card border="light" className='cardHome'>
                                            <Card.Title className='fs-1'>
                                                Shrimp Fajitas
                                            </Card.Title>

                                            <Card.Subtitle className=" fs-3 text-muted">
                                                Dinner
                                            </Card.Subtitle>

                                            <hr />

                                            <Card.Body className='ps-0'>
                                                <Card.Text className='mb-4' >
                                                Delicious seafood meal.
                                                </Card.Text>
                                                
                                                <Card.Text className='pb-4' >
                                                    Click below to view ingredients.
                                                </Card.Text>

                                                <Button variant="warning">Go to recipe</Button>
                                                <Button variant="outline-dark ms-2">View all dinner</Button>
                                            </Card.Body>
                                        </Card>

                                    </Col>


                                </Row>
                            </Col>

                        </Row>
                    </Carousel.Item>
                </Carousel> 

                <footer className='footerStyleHome'>
                    <Container fluid className='align-items-end mx-0 px-0 '>
                        <Row className='border-top border-warning border-3 footerStyleHome align-items-center'>
                            <Col xs={9} className="">
                                <p className='text-light footerlogo ps-4 pt-3 d-inline-block'>
                                    Food<span className='text-warning'>i</span>
                                </p>
                                <small className='ps-4'>@ 2022 Foodi. All Rights Reserved</small>

                            </Col>

                            <Col className='text-end'>
                                <i className="bi bi-instagram"></i>
                                <i className="bi bi-facebook" style={{ color: 'rgb(0, 132, 255)' }}></i>
                                <i className="bi bi-youtube" style={{ color: 'red' }}></i>
                            </Col>
                        </Row>
                    </Container>

                </footer>
                
            </Container>
        </>
    )
}



export default (Home)