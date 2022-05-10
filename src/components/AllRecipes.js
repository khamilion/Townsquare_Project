import React from 'react'
import { useEffect, useState } from 'react'

import {useDispatch, useSelector} from 'react-redux'
import { getAllRecipes, selectPostsInfo } from '../redux/postSlice'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import { Link } from 'react-router-dom'


import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import Header from './layout/Header'
import Footer from './layout/Footer';
import Recipes from './layout/Recipes'
import BounceLoader from "react-spinners/BounceLoader";


function AllRecipes() {
  const { posts, isLoading } = useSelector(selectPostsInfo);

  //set up the dispatch hook in order to call any action from any reducer
  const dispatch = useDispatch()

    //checkbox states
    const [vegetarian, setVegetarian] = useState(false)
    const [vegan, setVegan] = useState(false)
    const [pescatarian, setPescatarian] = useState(false)
    const [glutenFree, setGlutenFree] = useState(false)
  

  useEffect(() => {
    //console.log('use Effect Called on initial render');

    //Dispatch the action to get all recipes from database
    dispatch(getAllRecipes())
      //dispatched thunk has an unwrap property which can be called to extract the payload of a fulfilled action or to throw either the error
      .unwrap()
      .catch((error) => {
        // handle error here
        alert("Please try again: " + error)
      })

  },[]);

  //when  the user clicks on the checkbox, this func
  const filter = (mealType, e) => {
    e.preventDefault();

    switch (mealType) {

        case 'vegetarian':
            console.log('before update', vegetarian)
            setVegetarian(!vegetarian)
            console.log('after update', vegetarian)
            return(<p>Test recipes</p>)
            //create loop

            //find recipes with particular selection in array

            //display them on the page in cards
            break;

        case 'vegan':
            console.log('before update', vegan)
            setVegan(!vegan)
            console.log('after update', vegan)
            break;

        case 'pescatarian':
            console.log('before update', pescatarian)
            setPescatarian(!pescatarian)
            console.log('after update', pescatarian)
            break;

        case 'glutenFree':
            console.log('before update', glutenFree)
            setGlutenFree(!glutenFree)
            console.log('after update', glutenFree)
            break;

        default:
            console.log("didnt update")
    }
}



  // display the recipes if isloading is false and posts is true
  if (!isLoading && posts) {
    console.log(posts)
    return (
      <>
        <Header />

        <Container fluid className='topTheme'>

          <Container fluid='lg'>
            <Row className=''>
              <Col xs={4} style={{ letterSpacing: ' .5rem' }}>
                <p className='pt-3 pb-0'><span style={{ fontSize: '50px', fontWeight: 'bold' }}>A</span>ll Recipes</p>
              </Col>

              <Col className=" text-end">

                <DropdownButton id="dropdown-item-button" title="Selections" drop="start">

                  <Dropdown.ItemText>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="vegetarian" id="vegetarian" onChange={(e) => filter(e.target.value, e)} />
                      <label className="form-check-label" htmlFor="vegetarian">
                        Vegetarian
                      </label>
                    </div>
                  </Dropdown.ItemText>

                  <Dropdown.ItemText>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="vegan" onChange={(e) => filter(e.target.value, e)} />
                      <label className="form-check-label" htmlFor="vegan">
                        Vegan
                      </label>
                    </div>
                  </Dropdown.ItemText>

                  <Dropdown.ItemText>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="pescatarian" onChange={(e) => filter(e.target.value, e)} />
                      <label className="form-check-label" htmlFor="pescatarian">
                        Pescatarian
                      </label>
                    </div>
                  </Dropdown.ItemText>

                  <Dropdown.ItemText>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="glutenFree" onChange={(e) => filter(e.target.value, e)} />
                      <label className="form-check-label" htmlFor="glutenFree">
                        Gluten Free
                      </label>
                    </div>
                  </Dropdown.ItemText>

                </DropdownButton>

              </Col>
            </Row>
          </Container>

        </Container>

        <Container fluid='xl' style={{ height: 'max-content'}} >

          <Row sm={2} md={3} lg={4} className='gy-3 gx-3'>

            {posts.breakfast && posts.breakfast.map((doc) =>
              <>
                <Col key={doc.id} className="px-2">

                  <Card>
                    <Card.Img src={doc.image} alt={doc.name} style={{ height: '400px', objectFit: 'cover' }} />

                    <Card.ImgOverlay className='foodCardImgOv d-flex flex-column p-1'>
                      <div>
                        <i className="bi bi-heart text-danger align-self-start" style={{ fontSize: '1.5rem' }}></i>
                      </div>


                      <div className=' d-flex align-items-center flex-grow-1 text-center justify-content-center'>
                        <Link to={`/breakfast/breakfast/${doc.id}`} style={{ textDecoration: 'none', color: 'white' }}>
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

            {posts.lunch && posts.lunch.map((doc) =>
              <>
                <Col key={doc.id} className="px-2">

                  <Card>
                    <Card.Img src={doc.image} alt={doc.name} style={{ height: '400px', objectFit: 'cover' }} />

                    <Card.ImgOverlay className='foodCardImgOv d-flex flex-column p-1'>
                      <div>
                        <i className="bi bi-heart text-danger align-self-start" style={{ fontSize: '1.5rem' }}></i>
                      </div>


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

            {posts.dinner && posts.dinner.map((doc) =>
              <>
                <Col key={doc.id} className="px-2">

                  <Card>
                    <Card.Img src={doc.image} alt={doc.name} style={{ height: '400px', objectFit: 'cover' }} />

                    <Card.ImgOverlay className='foodCardImgOv d-flex flex-column p-1'>
                      <div>
                        <i className="bi bi-heart text-danger align-self-start" style={{ fontSize: '1.5rem' }}></i>
                      </div>


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
      
      <div className="container container h-100 center-page">
        <div className="row h-100 justify-content-center align-items-center">
          <BounceLoader />
        </div>
      </div>
    </>
      )
  }
}

export default AllRecipes
