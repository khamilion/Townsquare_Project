import React from 'react'
import Header from './layout/Header';
import Footer from './layout/Footer';

import { selectUserInfo, setUsersTable} from '../redux/userSlice'
import { selectPostsInfo } from '../redux/postSlice'
import {useDispatch, useSelector} from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'
import Tooltip from 'react-bootstrap/Tooltip'


import { Link } from 'react-router-dom'
import BounceLoader from "react-spinners/BounceLoader";

function Dinner() {
    const {posts, isLoading } = useSelector(selectPostsInfo)
    const { user, isAuthenticated, saved} = useSelector(selectUserInfo)
    let user_id = null
    let dinner = null

    //get the dinner posts from the posts array if posts is true
     if (posts){
        dinner = posts.dinner
     }

    //get the user id from the current user
    if(user){
        user_id = user.uid
    }

  //set up the dispatch hook in order to call any action from any reducer
  const dispatch = useDispatch()

//After the user clicks the save button, this function expression is called
  const save = (meal_id, action) =>{

      //dispatch the action to save the recipe to the users table
      dispatch(setUsersTable({meal_id: meal_id,
                                meal_type: 'dinner',
                                    field: 'saved_recipes',
                                        user_id: user_id,
                                            action: action}))
          //dispatched thunk has an unwrap property which can be called to extract the payload of a fulfilled action or to throw either the error
          .unwrap()
          .then(() => {

          })
          .catch((error) => {
              // handle error here
              alert("Please try again, " + error)
          })
  }
    

  // display the recipes if isloading is false and posts is true
  if (!isLoading && dinner) {
    return (
        <>
            <Header />

            <Container fluid className='text-warning dinnerTheme'>
                <Container fluid='lg'>
                    <Row>
                        <Col xs={4} style={{ letterSpacing: ' .5rem' }}>
                            <p className='pt-3 pb-0'><span style={{ fontSize: '50px', fontWeight: 'bold' }}>D</span>inner</p>
                        </Col>
                    </Row>
                </Container>


            </Container>

            <Container fluid='xl' style={{ height: 'max-content' }} >

                <Row sm={2} md={3} xl={4} className='gy-3 gx-3'>

                    {dinner && dinner.map((doc) =>
                        <>
                            <Col key={doc.id} className="px-2">

                                <Card> 

                                    <Card.Img src={doc.image} alt={doc.name} style={{ height: '400px', objectFit: 'cover' }} />
  
                                    <Card.ImgOverlay className='foodCardImgOv d-flex flex-column p-1 '>
                                        {isAuthenticated
                                            ? <div>
                                                {saved.includes(doc.id)
                                                    ? <button className="btn " onClick={(e) => save(doc.id, 'remove')}>
                                                        <i className="bi bi-heart-fill text-danger align-self-start" style={{ fontSize: '1.5rem' }}></i>
                                                    </button>
                                                    : <button className="btn " onClick={(e) => save(doc.id, 'save')}>
                                                        <i className="bi bi-heart text-danger align-self-start" style={{ fontSize: '1.5rem' }}></i>
                                                    </button>}
                                            </div>
                                            : <div>
                                                <OverlayTrigger
                                                    placement={'top'}
                                                    overlay={
                                                        <Tooltip id={`savedTooltip`}>
                                                            login to save!
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Button variant="">
                                                        <i className="bi bi-heart text-danger align-self-start" style={{ fontSize: '1.5rem' }}></i>
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>}

                                        
                                        <div className=' d-flex align-items-center flex-grow-1 text-center justify-content-center'>
                                            <Link to={`/dinner/${doc.id}`} style={{ textDecoration: 'none', color: 'white'}}>
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

export default Dinner
