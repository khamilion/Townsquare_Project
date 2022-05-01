import React, { useEffect, useState } from 'react'
import Recipes from './layout/Recipes'
import Header from './layout/Header';

import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes, selectPostsInfo } from '../redux/postSlice';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Navbar } from 'react-bootstrap';
import NavComponent from './layout/NavComponent';
import{ useNavigate, Link } from 'react-router-dom'

function Home() {

    useEffect(() => {

    }, []);

    //A selector is a function that takes the entire Redux store state as its argument, reads some value from the state, and returns that result.
   // const {user} = useSelector(selectUserInfo)

    return (
        <>
            <Header />

            <Container fluid className='vh-100'>
                <Row className="h-75 border-bottom">
                    <Col className="border border-danger">
                        1 of 1
                    </Col>
                    <Col className="border border-warning">
                        1 of 1
                    </Col>
                </Row>
            </Container>



        </>
    )
}



export default (Home)