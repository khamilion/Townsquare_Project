import React from 'react'
import Header from './layout/Header';
import Footer from './layout/Footer';

import { useEffect } from 'react'

import { getRecipe, selectPostsInfo } from '../redux/postSlice'
import {useDispatch, useSelector} from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


import { Link } from 'react-router-dom'
import BounceLoader from "react-spinners/BounceLoader";

function Lunch() {
    const { posts, isLoading } = useSelector(selectPostsInfo);

  //set up the dispatch hook in order to call any action from any reducer
  const dispatch = useDispatch()

  useEffect(() => {
    //use Effect Called on initial render

    //Dispatch the action to get all recipes from database
    dispatch(getRecipe({'meal': 'lunch',
                            'recipe': 'all'}))
                        //dispatched thunk has an unwrap property which can be called to extract the payload of a fulfilled action or to throw either the error
                        .unwrap()
                        .catch((error) => {
                          // handle error here
                          alert("Please try again: " + error)
                        })
  },[]);

  // display the recipes if isloading is false and posts is true
  if (!isLoading && posts) {
    return (
        <>
            <Header />

            <Container fluid className='text-success lunchTheme'>
                <Container fluid='lg'>
                    <Row>
                        <Col xs={4} style={{ letterSpacing: ' .5rem' }}>
                            <p className='pt-3 pb-0'><span style={{ fontSize: '50px', fontWeight: 'bold' }}>L</span>unch</p>
                        </Col>
                    </Row>
                </Container>


            </Container>

            <Container fluid='lg' style={{ height: 'max-content' }} >

                <Row sm={2} md={3} xl={4} className='gy-3 gx-3'>

                    {posts && posts.map((doc) =>
                        <>
                            <Col key={doc.id} className="px-2">

                                <Card className=''> 

                                    <Card.Img src={doc.image} alt={doc.name} style={{ height: '400px', objectFit: 'cover' }} />

                                    <Card.ImgOverlay className='foodCardImgOv d-flex flex-column p-1'>
                                        <div className=''>
                                            <i className="bi bi-heart text-danger align-self-start" style={{ fontSize: '1.5rem' }}></i>
                                        </div>


                                        <div className=' d-flex align-items-center flex-grow-1 text-center justify-content-center'>
                                            <Link to='/home' style={{ textDecoration: 'none', color: 'white' }}>
                                                <Card.Title className=' py-5 fs-3'>
                                                    {doc.name}
                                                </Card.Title>
                                            </Link>
                                        </div>

                                    </Card.ImgOverlay>

                                </Card>

                            </Col>
                        </>

                    )}

                </Row>

            </Container>

            <Footer />

        </>
      )
  }
  else{
    return (    
        <>
          <Header />
          
          <div className='d-flex vh-100 justify-content-center align-items-center'>
                <BounceLoader />
            </div>
        </>
          )
  }

    
}

export default Lunch
