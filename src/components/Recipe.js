import React from 'react'
import Header from './layout/Header';
import Footer from './layout/Footer';

import { selectUserInfo, setUsersTable} from '../redux/userSlice'
import {selectPostsInfo } from '../redux/postSlice'
import {useDispatch, useSelector} from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'
import Tooltip from 'react-bootstrap/Tooltip'


import { useParams } from 'react-router-dom'
import BounceLoader from "react-spinners/BounceLoader";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils, faC } from '@fortawesome/free-solid-svg-icons'

function Recipe() {

    const { posts, isLoading } = useSelector(selectPostsInfo)
    const { user, isAuthenticated, saved} = useSelector(selectUserInfo)
    let recipeDetails = null, meal_type = null, user_id = null


      //set up the dispatch hook in order to call any action from any reducer
  const dispatch = useDispatch()

    //Get the parameter containing the id
    const {recipeID} = useParams()

    if (posts) {

        //loop through the posts to find particular recipe post
        Object.entries(posts).forEach(([mealType, meals]) => {
            meals.forEach(rec => {
                if (rec.id == recipeID) {
                    recipeDetails = rec
                    meal_type = mealType
                    console.log('meal_type', meal_type)
                }

            })
        });
    }
    //get the user id from the current user
    if (user) {
        user_id = user.uid
    }

    //After the user clicks the save button, this function expression is called
    const save = (meal_id, action) => {


        //dispatch the action to save the recipe to the users table
        dispatch(setUsersTable({ meal_id: meal_id,
                                    meal_type: meal_type,
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

    if(!isLoading && posts && recipeDetails){
        
        return (
            <>
              <Header />
            
            <Container fluid='xxl' className='max-content'>
    
                    <Row className=''>
                        <Col xs={12} className='d-flex align-items-center justify-content-center fs-1 '>
                            <p className='recipeHeading pt-4'>{recipeDetails.name}</p>
                            
                        </Col>
    
                        <Col xs={12} >
                            <Row className='justify-content-center text-center recipeDetails border-top border-bottom'>
                                <Col xs={2} className=' d-flex align-items-center justify-content-center'>
                                    <div>
                                        <FontAwesomeIcon icon={faUtensils} size="2x" className="recipeDetailsIcon" />
                                        <p className='mb-0'>serving</p>
                                        <p className='mt-0 mb-0'>{recipeDetails.serves}</p>
                                    </div>
                                
                                </Col>
    
                                <Col xs={2} className='d-flex align-items-center justify-content-center'>
                                    <div>
                                    <FontAwesomeIcon icon={faC} size="2x"  className="recipeDetailsIcon mb-0"/>
                                    <p className='mb-0'>calories</p>
                                    <p className='mt-0 mb-0'>{recipeDetails.calories}</p>
                                    </div>
                                   
                                </Col>
    
                                <Col xs={2} className=' d-flex  align-items-center justify-content-center'>
                                    <div>
                                    <i className="bi bi-clock-history pb-0" style={{color: 'black'}}></i>
                                    <p className='mb-0 pt-0'>preperation</p>
                                    <p className='mt-0 mb-0'>{recipeDetails.preperation}</p>
                                    </div>
                               
                                </Col>
    
                                

                                <Col xs={1} className=' d-flex align-items-center justify-content-center'>
                                    <div>
                                        <p className='mb-0'>save</p>
                                        {isAuthenticated
                                            ? <div>
                                                {saved.includes(recipeDetails.id)
                                                    ? <button className="btn " onClick={(e) => save(recipeDetails.id, 'remove')}>
                                                        <i className="bi bi-heart-fill text-danger align-self-start" style={{ fontSize: '1.5rem' }}></i>
                                                    </button>
                                                    : <button className="btn " onClick={(e) => save(recipeDetails.id, 'save')}>
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
                                    </div>
                                
                                </Col>

                                <Col xs={2} className=' d-flex align-items-center justify-content-center'>
                                    <div>
                                    
                                    {recipeDetails.keywords && recipeDetails.keywords.map((item, index) =>  <p key={index}> {item}</p>)}
                                    </div>
                                
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                        
                    <Row>
    
                        <Col md={4} className=' order-sm-last order-md-first border-start border-end'>
                            <div className='ms-5 mt-3'>
                                <p className='recipeSubHeading' >Ingredients</p>
    
                                <div className='ps-2' style={{backgroundColor: 'rgba(211, 211, 211, 0.465)'}}>
                                {recipeDetails.ingredients && recipeDetails.ingredients.map((ingred, i) => <p key={i}> {ingred} </p>)}
                                </div>
                                
                            </div>
                           
                            <div className='ms-5 mt-3'>
                                <p className='recipeSubHeading'>Notes</p>
    
                                <p>SOURCE</p>
                                <a href={recipeDetails.source} className="link-warning">{recipeDetails.source}</a>
                            </div>
    
                        </Col>
    
    
                        <Col md={8} className=' order-sm-first order-md-last border-end'>
                            <div className='text-center mt-3'>
                                <img src={recipeDetails.image} alt={recipeDetails.name} height="400px" width="450px" className="recipeImg" />
                            </div>
    
                            <div className='ms-3'>
                                <p className='recipeSubHeading mt-3'>Directions</p>
                                <div>
                                {
                                        recipeDetails.instructions && Object.keys(recipeDetails.instructions).map((instructionStep, i) => {
                                            return (<p key={i}>{recipeDetails.instructions[instructionStep]}</p>)
                                        })
                                    }
                                    
                                </div>
                            </div>
                            
                        </Col>
    
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

export default Recipe
