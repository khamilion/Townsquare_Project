import React, { useState } from 'react'
import Header from './layout/Header';
import Footer from './layout/Footer';

import { selectPostsInfo } from '../redux/postSlice'
import {useDispatch, useSelector} from 'react-redux'
import { selectUserInfo, setUsersTable} from '../redux/userSlice'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'
import Tooltip from 'react-bootstrap/Tooltip'

import { Link } from 'react-router-dom'
import BounceLoader from "react-spinners/BounceLoader";

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

function Breakfast() {
    const { posts, isLoading } = useSelector(selectPostsInfo)
    const { user, isAuthenticated, saved} = useSelector(selectUserInfo)
    let user_id = null
    let breakfast = null

    //get the breakfast posts from the posts array if posts is true
    if(posts){
        breakfast = posts.breakfast
    }

     //get the user id from the current user
    if(user){
        user_id = user.uid
    }

  //set up the dispatch hook in order to call any action from any reducer
  const dispatch = useDispatch()

  //checkbox states
  const [vegetarian, setVegetarian] = useState(false)
  const [vegan, setVegan] = useState(false)
  const [pescatarian, setPescatarian] = useState(false)
  const [glutenFree, setGlutenFree] = useState(false)



  //when  the user clicks on the checkbox, this func
  const filter = (mealType, e) => {
      //e.preventDefault();

      switch (mealType) {

          case 'vegetarian':
              
              setVegetarian(!vegetarian)
              
              
              //create loop

              //find recipes with particular selection in array

              //display them on the page in cards
              break;

          case 'vegan':
              
              setVegan(!vegan)
             
              break;

          case 'pescatarian':
              
              setPescatarian(!pescatarian)
              
              break;

          case 'glutenFree':
              
              setGlutenFree(!glutenFree)
              
              break;

          default:
              console.log("didnt update")
      }
  }

  //After the user clicks the save button, this function expression is called
  const save = (meal_id, action) =>{
    

      //dispatch the action to save the recipe to the users table
      dispatch(setUsersTable({meal_id: meal_id,
                                meal_type: 'breakfast',
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


  // display the recipes if isloading is false and recipe is true and user is true
  if (!isLoading && breakfast) {
    return (
        <>
            <Header />

            <Container fluid className='breakfastTheme'>

                <Container fluid='lg'>
                    <Row className=''>
                        <Col xs={4} style={{ letterSpacing: ' .5rem' }}>
                            <p className='pt-3 pb-0'><span style={{ fontSize: '50px', fontWeight: 'bold' }}>B</span>reakfast</p>
                        </Col>

                        <Col className=" text-end">
{/*}
                            <DropdownButton id="dropdown-item-button" title="Selections" drop="start">

                                <Dropdown.ItemText>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value={vegetarian} id="vegetarian" onChange={(e) => filter('vegetarian', e)}/>
                                            <label className="form-check-label" htmlFor="vegetarian">
                                                Vegetarian {vegetarian ? 'true' : 'false'}
                                            </label>
                                    </div>
                                </Dropdown.ItemText>

                                <Dropdown.ItemText>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value={vegan} onChange={(e) => filter("vegan", e)}/>
                                        <label className="form-check-label" htmlFor="vegan">
                                            Vegan
                                        </label>
                                    </div>
                                </Dropdown.ItemText>

                                <Dropdown.ItemText>
                                <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value={pescatarian} onChange={(e) => filter("pescatarian", e)}/>
                                        <label className="form-check-label" htmlFor="pescatarian">
                                        Pescatarian
                                        </label>
                                    </div>
                                </Dropdown.ItemText>

                                <Dropdown.ItemText>
                                <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value={glutenFree} onChange={(e) => filter("glutenFree", e)}/>
                                        <label className="form-check-label" htmlFor="glutenFree">
                                        Gluten Free
                                        </label>
                                    </div>
                                </Dropdown.ItemText>

                            </DropdownButton>
    */}
                        </Col>
                    </Row>
                </Container>

            </Container>

            
            <Container fluid='xl' style={{ height: 'max-content'}} >

                <Row sm={2} md={3} lg={4}  className='gy-3 gx-3'>
                    
                    {breakfast && breakfast.map((doc) =>
                        <>
                            <Col key={doc.id} className="px-2">

                                <Card>
                                    <Card.Img src={doc.image} alt={doc.name} style={{ height: '400px', objectFit: 'cover' }} />

                                    <Card.ImgOverlay className='foodCardImgOv d-flex flex-column p-1'>
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
                                            <Link to={`/breakfast/${doc.id}`} style={{ textDecoration: 'none', color: 'white' }}>
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

export default Breakfast
