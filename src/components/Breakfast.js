import React from 'react'
import Header from './layout/Header';
import Footer from './layout/Footer';
import Recipes from './layout/Recipes'
import { useEffect } from 'react'

import { getRecipe, selectPostsInfo } from '../redux/postSlice'
import {useDispatch, useSelector} from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import frenchToast from '../images/frenchToast.jpeg'
import { Link } from 'react-router-dom'
import BounceLoader from "react-spinners/BounceLoader";

function Breakfast() {
    const { posts, isLoading } = useSelector(selectPostsInfo);

  //set up the dispatch hook in order to call any action from any reducer
  const dispatch = useDispatch()

  useEffect(() => {
    //console.log('use Effect Called on initial render');

    //Dispatch the action to get all recipes from database
    dispatch(getRecipe({'meal': 'breakfast',
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

            <Container fluid className='breakfastTheme'>
                <Container fluid='lg'>
                <Row className=''>
                    <Col xs={4}  style={{ letterSpacing: ' .5rem' }}>
                        <p className='pt-3 pb-0'><span style={{ fontSize: '50px', fontWeight: 'bold' }}>B</span>reakfast</p>
                    </Col>
                </Row>
                </Container>


            </Container>

            <Container fluid='lg' style={{ height: 'max-content' }} >

                <Row sm={2} md={3} xl={4} className='gy-3 gx-3'>

                    {posts && posts.map((doc) =>
                        <>
                            <Col key={doc.id} className="px-2">

                                <Card>

                                    <nav>
                                        <Link to='/home' style={{ textDecoration: 'none' }}>
                                            <Card.Img src={doc.image} alt={doc.name} style={{ height: '400px', objectFit: 'cover' }} />
                                        </Link>
                                    </nav>

                                    <Card.ImgOverlay className='foodCardImgOv p-1 '>
                                       
                                    
                                        <div className='d-flex justify-content-between align-content-center' style={{ }} >
                                            

                                            <Card.Title className=' pb-1 fs-3' style={{ opacity: 1 }}>
                                                {doc.name}
                                            </Card.Title>

                                            <i className="bi bi-heart text-danger align-self-start" style={{ fontSize: '1.5rem' }}></i>
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
          
          <div className="container container h-100 center-page">
            <div className="row h-100 justify-content-center align-items-center">
              <BounceLoader />
            </div>
          </div>
        </>
          )
  }

    {/*
  return (
      <>
          <Header />

          <Container fluid className='breakfastTheme'>
              <Row className=''>

                  <Col xs={3}  className='' style={{ letterSpacing:' .5rem'}}>
                      <p style ={{paddingBottom:'0px'}}><span style={{fontSize:'50px', fontWeight: 'bold'}}>B</span>reakfast</p>
                  </Col>
              </Row>
              
          </Container>


          <Container fluid='lg' className='border border-success border-5' style={{height: 'max-content'}}>

              <Row sm={2} md={3} xl={4} className='gy-3 gx-3'>

                  <Col className=" px-2">

                      <Card className="text-dark foodCards">

                          <nav>
                              <Link to='/home' style={{ textDecoration: 'none' }}>
                                  <Card.Img src={frenchToast} alt="Card image" style={{ height: '400px', objectFit: 'cover' }} />
                              </Link>
                          </nav>

                          <Card.ImgOverlay className='text-end foodCardImgOv p-1 ' style={{}}>
                              <i className="bi bi-heart text-danger" style={{ fontSize: '1.5rem' }}></i>
                              <Card.Title className='pt-0 fs-3 text-center' style={{ opacity: 1 }}>French Toast</Card.Title>
                          </Card.ImgOverlay>

                      </Card>

                  </Col>

              </Row>
          </Container>

          <Footer />
      </>


    
  )
  */}
}

export default Breakfast
