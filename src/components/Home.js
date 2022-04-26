import React, { useEffect, useState } from 'react'
import Recipes from './Recipes'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo } from '../redux/userSlice';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Navbar } from 'react-bootstrap';
import NavComponent from './layout/NavComponent';
import{ useNavigate, Link } from 'react-router-dom'

function Home() {


    const [recipes, setRecipes] = useState(null);

    useEffect(() => {
        //runs once after initial mounting
        fetch('/Home')
            .then((res) => res.json())
            .then((data) => { setRecipes(data); console.log(data) });
    }, []);

    //A selector is a function that takes the entire Redux store state as its argument, reads some value from the state, and returns that result.
    const {user} = useSelector(selectUserInfo)

    return (
        <>
            <header>

                <Container fluid className='homehdr justify-content-center pt-4'>

                    <Row className='justify-content-center text-center'>
                        <Col>
                            <div className='pt-3'>
                                <nav>
                                    <Link to='/' className='text-dark p-2 border border-primary bg-primary rounded-pill' style={{ textDecoration: 'none' }}> My Profile</Link>
                                </nav>
                            </div>
                        </Col>

                        <Col xs={8}>
                            <p className='text-light  mb-0' style={{ fontSize: '45px' }}>
                                Food<span className='text-warning'>i</span>
                            </p>
                        </Col>

                        <Col>
                            <div className='pt-3'>
                                <nav>
                                    <Link to='/Home' className='text-dark p-2 border border-warning bg-warning rounded-pill' style={{ textDecoration: 'none' }}> Log Out</Link>
                                </nav>
                            </div>
                        </Col>
                    </Row>

                    <NavComponent />
                    
                </Container>

            </header>


            <div className='homeBG'>
                {recipes && recipes.map((doc) =>
                    <Recipes doc={doc} />
                )}
            </div>



        </>
    )
}



export default (Home)