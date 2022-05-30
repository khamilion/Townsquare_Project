import React,  { useEffect, useState }  from 'react'
import Header from './layout/Header';
import Footer from './layout/Footer';

import {selectUserInfo, setUsersTable} from '../redux/userSlice'

import { selectPostsInfo, uploadForm } from '../redux/postSlice'
import {useDispatch, useSelector} from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'
import Tooltip from 'react-bootstrap/Tooltip'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'

import { Link } from 'react-router-dom'
import BounceLoader from "react-spinners/BounceLoader";

function Profile() {

    //Form state hooks
    const [form, setForm] = useState({}) //holds key value pair for each form field
    const [errors, setErrors] = useState({}) //holds key value pair for each error

    const {user, saved, original, isAuthenticated} = useSelector(selectUserInfo)
    const { posts, isLoading } = useSelector(selectPostsInfo)

    //hook hold boolean values either to or hide form
    const [showForm, setShowForm] = useState(false);

    const handleCloseForm = () => setShowForm(false);
    const handleShowForm = () => setShowForm(true);

    //correct image types
    const types =['image/png', '/image/jpeg']
    
     let user_id = null; let meal_type = null;

    //boolean variable determinse if the recipe is found in the nested loop
    let found = false

    let originalRecipes = []
    let savedRecipes = []
    
    const [showSaved, setShowSaved] = useState(true)
    const [showUploaded, setShowUploaded] = useState(false)

       //set up the dispatch hook in order to call any action from any reducer
  const dispatch = useDispatch()
    
    //if not empty
    if (posts && saved && original) {
        //holds the values in the posts array
        let meals_array = Object.entries(posts)

        //loop through saved recipes
        for (let s = 0; s < saved.length; s++) {

            found = false

            //Inner loop to find saved recipe in posts (meals_array)
            for (const [mealType, meals] of meals_array) {
                console.log(`${mealType}:`);

                //find particular recipe in the array nested in meals array
                for (let meal of meals) {

                    console.log('meals:', meal.id)

                    //if the current recipe in meal is the same as the current saved recipe
                    if (meal.id === saved[s]) {
                        found = true
                        meal_type = mealType

                        savedRecipes.push(meal)
                        break;
                    }

                }

                if (found) {
                    break;
                }
            }
        }


         //loop through original recipes
         for (let o = 0; o < original.length; o++) {

            found = false

            //Inner loop to find original recipe in posts (meals_array)
            for (const [mealType, meals] of meals_array) {
                console.log(`${mealType}:`);

                //find particular recipe in the array nested in meals array
                for (let meal of meals) {

                    console.log('meals:', meal.id)

                    //if the current recipe in meal is the same as the current original recipe
                    if (meal.id === original[o]) {
                        found = true

                        meal_type = mealType

                        originalRecipes.push(meal)
                        break;
                    }

                }

                if (found) {
                    break;
                }
            }
        }

        console.log(originalRecipes)
        console.log(savedRecipes)
    }

    //get the user id from the current user
    if (user) {
        user_id = user.uid
    }


    //function that changes the boolean value once it is clicked
    function displaySaved(e) {

        //set showSaved to true and setShowUploaded to false
        setShowSaved(true)
        setShowUploaded(false)
    }

    //function that changes the boolean value once it is clicked
    function displayUploaded(e) {

        //set showSaved to true and setShowUploaded to false
        setShowUploaded(true)
        setShowSaved(false)

    }

//save the users choice to the database
//After the user clicks the save button, this function expression is called
  const save = (meal_id, field,action) =>{
    

      //dispatch the action to save the recipe to the users table
      dispatch(setUsersTable({meal_id: meal_id,
                                meal_type: meal_type,
                                    field: field,
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

  const submitForm = (e) => {
    e.preventDefault()

    

    // get new errors
    const newErrors = findFormErrors()

    // Check for any new errors. If there are new errors set the errors value
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    }
    //Otherwise fetch the uploads endpoint through redux thunk
    else {
        //close the form with no erros
        handleCloseForm()

        alert("upload the new recipe!")
    
      //dispatch the action to upload new recipe with validated credentials
      dispatch(uploadForm({'image': form.image
                        }))
                        //dispatched thunk has an unwrap property which can be called to extract the payload of a fulfilled action or to throw either the error
                        .unwrap()
                        .then(() => {
                          //if the there are no errors navigate to the home page
                          
                      })
                        .catch((error) => {
                          // handle error here
                          alert("Please try again: " + error)
                        })
    }


  }



    //function to update each field onchange. Also checks errors for each field
    const setField = (field, value) => {
        //Update the state for current values
        setForm({ ...form, [field]: value })
        if (field === 'image'){
            let selected = value
            console.log(selected)

            
        }
        
        // Check and see if errors exist, and remove them from the error object
        if (!!errors[field]) setErrors({
          ...errors,
          [field]: null
        })
      }

    //Checks the form for errors 
    const findFormErrors = () => {
        //deconstruct the form object
        const { name, calories, ingredients, instructions, serves, image } = form
        const newErrors = {}

        // name errors
        if (!name || name === '') newErrors.name = 'cannot be blank!'

        // calories errors
        if (!calories || calories === '') newErrors.calories = 'cannot be blank!'

        // ingredients errors
        if (!ingredients || ingredients === '') newErrors.ingredients = 'cannot be blank!'

        // password errors
        if (!instructions || instructions === '') newErrors.instructions = 'cannot be blank!'
        
        // serves errors
        if (!serves || serves === '') newErrors.serves = 'cannot be blank!'

        //if the image type is correct
        if(!image || !(types.includes(image.type))){
            newErrors.image = 'select either .png or .jpeg!'
        }

        return newErrors
    }


     // display the page if isloading is false 
  if (!isLoading && posts && saved && original){
    let name = user.name.split(" ")
    
    return (
        <>
            <Header />
  
            <Container fluid='xl' style={{minHeight:'80vh'}} >

                <Row className="justify-content-center py-4 ">
                    <Col xs={3} className='border-bottom border-left border-3'>
                        <div className='profilePic pt-3 d-inline-flex align-items-center justify-content-center '>
                            <p className=' p-0 m-0 fw-light'>{name[0].charAt(0).toUpperCase()} </p>
                        </div>
                        <p className='profileSub ms-3 mt-3'>{user.email}</p>
                    </Col>

                    <Col xs={7} className=" p-3 profileTop text-center border-bottom border-3">
                        <p >Hi,</p>
                        
                        <p className='fs-1'> {user.name}</p>

                        
                        
                    </Col>

                    <Col xs={2} className=" border-bottom  border-right border-3 profileSub d-flex text-center align-items-center justify-content-center">
                     
                            <div>
                                <p className='mb-0'>Saved </p>
                                <p>{savedRecipes.length}</p>
                           
                                <p className='mb-0'>Uploaded</p>
                                <p>{originalRecipes.length}</p>
                            </div>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col xs={12}>
                        <Row className='text-center'>
                            <Col xs={12} className="text-end">
                                <div className='pb-3'>
                                    <Button className="uploadBtn" size="sm" variant="light" onClick={handleShowForm}>Upload</Button>
                                </div>
                                
                            </Col>
                            <Col xs={12} className='px-0'>
                            

                                <div className="btn-group d-flex" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" className="btn-check" name="btnradio" id="saved" autoComplete="off" checked={showSaved} onChange={(e) => { displaySaved(e) }} />
                                    <label className="btn btn-outline-warning" htmlFor="saved">Saved</label>

                                    <input type="radio" className="btn-check" name="btnradio" id="uploaded" autoComplete="off" checked={showUploaded} onChange={(e) => { displayUploaded(e) }} />
                                    <label className="btn btn-outline-warning" htmlFor="uploaded">Uploaded</label>
                                </div>

                            </Col>
                        </Row>
                    </Col>

                    <Col className='border' style={{minHeight: '40vh'}} >

                        {showSaved
                            ? 
                            <Row sm={2} md={3} lg={4} className='gy-3 gx-3'>

                                {savedRecipes.length ? savedRecipes.map((doc) =>
                                    <>
                                        <Col key={doc.id} className="px-2">

                                            <Card>
                                                <Card.Img src={doc.image} alt={doc.name} style={{ height: '300px', objectFit: 'cover' }} />

                                                <Card.ImgOverlay className='foodCardImgOv d-flex flex-column p-1'>
                                                    <div>
                                                        <button className="btn " onClick={(e) => save(doc.id, 'saved_recipes', 'remove')}>
                                                            <i className="bi bi-heart-fill text-danger align-self-start" style={{ fontSize: '1.5rem' }}></i>
                                                        </button>
                                                    </div>


                                                    <div className=' d-flex align-items-center flex-grow-1 text-center justify-content-center'>
                                                        <Link to={`/profile/${doc.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                                            <Card.Title className=' py-5 fs-3'>
                                                                {doc.name}
                                                            </Card.Title>
                                                        </Link>
                                                    </div>

                                                </Card.ImgOverlay>
                                            </Card>

                                        </Col>
                                    </>

                                ) :<> <p className='profileSub'>No Saves Yet</p> </>}

                            </Row>
                            : <Row sm={2} md={3} lg={4} className='gy-3 gx-3'>

                                {originalRecipes.length ? originalRecipes.map((doc) =>
                                    <>
                                        <Col key={doc.id} className="px-2">

                                            <Card>
                                                <Card.Img src={doc.image} alt={doc.name} style={{ height: '300px', objectFit: 'cover' }} />

                                                <Card.ImgOverlay className='foodCardImgOv d-flex flex-column p-1'>
                                                    <div>
                                                        <i className="bi bi-heart-fill text-danger align-self-start" style={{ fontSize: '1.5rem' }}></i>
                                                    </div>


                                                    <div className=' d-flex align-items-center flex-grow-1 text-center justify-content-center'>
                                                        <Link to={`/profile/${doc.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                                            <Card.Title className=' py-5 fs-3'>
                                                                {doc.name}
                                                            </Card.Title>
                                                        </Link>
                                                    </div>

                                                </Card.ImgOverlay>
                                            </Card>

                                        </Col>
                                    </>

                                ) : <Col>
                                    <p className='profileSub '>No Uploads yet</p>
                                </Col>
                                }

                            </Row>}
                    </Col>
                </Row>

                <Modal show={showForm} onHide={handleCloseForm} backdrop="static" centered >
                    <Modal.Header className='uploadForm modalHdr text-light' >
                        <Modal.Title>Upload Original Recipe</Modal.Title>
                        <Button onClick={handleCloseForm} variant="light">x</Button>
                    </Modal.Header>

                    <Modal.Body className='modalStyle' scrollable>
                        <Form className='' onSubmit={submitForm}>

                            <Form.Group className="mb-3 " controlId="name">
                                <Form.Label className='fw-light' column="lg"><span className='uploadForm'>Recipe Name</span></Form.Label>
                                <Form.Control isInvalid={!!errors.name} className=' bg-light text-dark border-top border-1' size="lg" placeholder="Casserole" onChange={(e) => { setField('name', e.target.value) }} />
                                <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="calories">
                                    <Form.Label className='fw-light' column="lg"><span className='uploadForm'>Calories</span></Form.Label>
                                    <Form.Control isInvalid={!!errors.calories} className=' bg-light text-dark' size="lg" placeholder="367" onChange={(e) => { setField('calories', e.target.value) }} />
                                    <Form.Control.Feedback type='invalid'>{errors.calories}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="serves">
                                    <Form.Label className='fw-light' column="lg"><span className='uploadForm'>Serves</span></Form.Label>
                                    <Form.Control isInvalid={!!errors.serves} className=' bg-light text-dark' size="lg" placeholder="1" onChange={(e) => { setField('serves', e.target.value) }} />
                                    <Form.Control.Feedback type='invalid'>{errors.lname}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="keywords">
                                    <Form.Label className='fw-light' column="lg"><span className='uploadForm'>Keywords</span></Form.Label>
                                    <Form.Control className=' bg-light text-dark' size="lg" placeholder="vegan" onChange={(e) => { setField('keywords', e.target.value) }} />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3 " controlId="ingredients">
                                <Form.Label className='fw-light' column="lg"><span className='uploadForm'>Ingredients</span></Form.Label>
                                <Form.Control  as="textarea" isInvalid={!!errors.ingredients} className=' bg-light text-dark border-top border-1' size="lg"  placeholder="2 eggs, salt, pepper" onChange={(e) => { setField('ingredients', e.target.value) }} />
                                <Form.Control.Feedback type='invalid'>{errors.ingredients}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="instructions">
                                <Form.Label className='fw-light' column="lg"><span className='uploadForm'>Instructions</span></Form.Label>
                                <Form.Control as="textarea" isInvalid={!!errors.instructions} className=' bg-light text-dark border-light border-1' size="lg" placeholder="step 1, step 2, step 3" onChange={(e) => { setField('instructions', e.target.value) }} />
                                <Form.Control.Feedback type='invalid'>{errors.instructions}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="image" className="mb-3">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control isInvalid={!!errors.image}  type="file" onChange={(e) => { setField('image', e.target.files[0]) }}/>
                                <Form.Control.Feedback type='invalid'>{errors.image}</Form.Control.Feedback>
                            </Form.Group>


                            <div className='d-flex justify-content-center mt-4'>
                                <Button variant="secondary" type="submit">
                                    Upload
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
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

export default Profile
