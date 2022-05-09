import React, { useEffect, useState } from 'react'
import Header from './layout/Header';
import Footer from './layout/Footer';

import { getRecipe, selectPostsInfo } from '../redux/postSlice'
import {useDispatch, useSelector} from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import { Link, useParams, useRouteMatch } from 'react-router-dom'
import BounceLoader from "react-spinners/BounceLoader";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils, faC } from '@fortawesome/free-solid-svg-icons'

function Recipe() {

    const { posts, isLoading } = useSelector(selectPostsInfo);

    let id, name, keywords, image, serves, calories, ingredients, instructions, source

    //Get the parameter containing the id
    const {recipeID} = useParams()

    //loop through the posts array containing the recipe information to find the currect recipe to display
    posts.forEach((doc) => {
        if (doc.id === recipeID){
             ({id, name, keywords, image, serves, calories, ingredients, instructions, source} = doc )
        }
    })

    return (
        <>
          <Header />
        
        <Container fluid='xxl' className='max-content'>

                <Row className=''>
                    <Col xs={12} className='d-flex align-items-center justify-content-center fs-1 '>
                        <p className='recipeHeading pt-4'>{name}</p>
                        
                    </Col>

                    <Col xs={12} >
                        <Row className='justify-content-center text-center recipeDetails border-top border-bottom'>
                            <Col xs={2} className=' d-flex align-items-center justify-content-center'>
                                <div>
                                    <FontAwesomeIcon icon={faUtensils} size="2x" className="recipeDetailsIcon" />
                                    <p className='mb-0'>serving</p>
                                    <p className='mt-0 mb-0'>{serves}</p>
                                </div>
                            
                            </Col>

                            <Col xs={2} className='d-flex align-items-center justify-content-center'>
                                <div>
                                <FontAwesomeIcon icon={faC} size="2x"  className="recipeDetailsIcon"/>
                                <p className='mb-0'>calories</p>
                                <p className='mt-0 mb-0'>{calories}</p>
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
                                
                                {keywords && keywords.map((item, index) =>  <p key={index}> {item}</p>)}
                                </div>
                            
                            </Col>
                        </Row>
                    </Col>
                </Row>
                    
                <Row>

                    <Col md={4} className=' order-sm-last order-md-first border-start border-end'>
                        <div className='ms-5'>
                            <p className='recipeSubHeading' >Ingredients</p>

                            <div className='ps-2' style={{backgroundColor: 'rgba(211, 211, 211, 0.465)'}}>
                            {ingredients.map((ingred, i) => <p key={i}> {ingred} </p>)}
                            </div>
                            
                        </div>
                       
                        <div className='ms-5 mt-3'>
                            <p className='recipeSubHeading'>Notes</p>

                            <p>SOURCE</p>
                            <a href={source} class="link-warning">{source}</a>
                        </div>

                    </Col>


                    <Col md={8} className=' order-sm-first order-md-last border-end'>
                        <div className='text-center'>
                            <img src={image} alt={name} height="400px" width="400px" className="recipeImg" />
                        </div>

                        <div className='ms-3'>
                            <p className='recipeSubHeading mt-3'>Directions</p>
                            <p>
                            {
                                    Object.keys(instructions).map((instructionStep, i) => {
                                        return (<p key={i}>{instructions[instructionStep]}</p>)
                                    })
                                }
                                
                            </p>
                        </div>
                        
                    </Col>

                </Row>
                        
       </Container>

       <Footer />
        </>
      )
}

export default Recipe
