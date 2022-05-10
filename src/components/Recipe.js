import React, { useEffect, useState } from 'react'
import Header from './layout/Header';
import Footer from './layout/Footer';

import {getRecipe, selectPostsInfo } from '../redux/postSlice'
import {useDispatch, useSelector} from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import { useParams, useLocation } from 'react-router-dom'
import BounceLoader from "react-spinners/BounceLoader";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils, faC } from '@fortawesome/free-solid-svg-icons'

function Recipe() {

    const { posts, isLoading, recipe } = useSelector(selectPostsInfo);
    

      //set up the dispatch hook in order to call any action from any reducer
  const dispatch = useDispatch()

    //Get the parameter containing the id
    const {meal, recipeID} = useParams()

    //get the current path location 
    let location = useLocation();

    

    console.log(recipeID)
    console.log(meal)
    useEffect(() => {
        //holds the meal type  of current recipe
        //let meal

        //console.log('use Effect Called on initial render');
        let path = location.pathname
        console.log(`path: ${path}`)

        //Dispatch the action to get a recipe from database
        dispatch(getRecipe({
            'meal': meal,
            'recipe': recipeID
        }))
            //dispatched thunk has an unwrap property which can be called to extract the payload of a fulfilled action or to throw either the error
            .unwrap()
            .catch((error) => {
                // handle error here
                alert("Please try again: " + error)
            })

    }, []);

    if(!isLoading && recipe){
        console.log(recipe)
        return (
            <>
              <Header />
            
            <Container fluid='xxl' className='max-content'>
    
                    <Row className=''>
                        <Col xs={12} className='d-flex align-items-center justify-content-center fs-1 '>
                            <p className='recipeHeading pt-4'>{recipe[0].name}</p>
                            
                        </Col>
    
                        <Col xs={12} >
                            <Row className='justify-content-center text-center recipeDetails border-top border-bottom'>
                                <Col xs={2} className=' d-flex align-items-center justify-content-center'>
                                    <div>
                                        <FontAwesomeIcon icon={faUtensils} size="2x" className="recipeDetailsIcon" />
                                        <p className='mb-0'>serving</p>
                                        <p className='mt-0 mb-0'>{recipe[0].serves}</p>
                                    </div>
                                
                                </Col>
    
                                <Col xs={2} className='d-flex align-items-center justify-content-center'>
                                    <div>
                                    <FontAwesomeIcon icon={faC} size="2x"  className="recipeDetailsIcon"/>
                                    <p className='mb-0'>calories</p>
                                    <p className='mt-0 mb-0'>{recipe[0].calories}</p>
                                    </div>
                                   
                                </Col>
    
                                <Col xs={2} className=' d-flex  align-items-center justify-content-center'>
                                    <div>
                                    <i className="bi bi-clock-history" style={{color: 'black'}}></i>
                                    <p className='mb-0'>preperation</p>
                                    </div>
                               
                                </Col>
    
                                <Col xs={2} className=' d-flex align-items-center justify-content-center'>
                                    <div>
                                    
                                    {recipe[0].keywords && recipe[0].keywords.map((item, index) =>  <p key={index}> {item}</p>)}
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
                                {recipe[0].ingredients && recipe[0].ingredients.map((ingred, i) => <p key={i}> {ingred} </p>)}
                                </div>
                                
                            </div>
                           
                            <div className='ms-5 mt-3'>
                                <p className='recipeSubHeading'>Notes</p>
    
                                <p>SOURCE</p>
                                <a href={recipe[0].source} className="link-warning">{recipe[0].source}</a>
                            </div>
    
                        </Col>
    
    
                        <Col md={8} className=' order-sm-first order-md-last border-end'>
                            <div className='text-center mt-3'>
                                <img src={recipe[0].image} alt={recipe[0].name} height="400px" width="500px" className="recipeImg" />
                            </div>
    
                            <div className='ms-3'>
                                <p className='recipeSubHeading mt-3'>Directions</p>
                                <div>
                                {
                                        recipe[0].instructions && Object.keys(recipe[0].instructions).map((instructionStep, i) => {
                                            return (<p key={i}>{recipe[0].instructions[instructionStep]}</p>)
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
