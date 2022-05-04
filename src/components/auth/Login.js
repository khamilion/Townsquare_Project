import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {setEmail, setPassword, selectUserInfo, login} from '../../redux/userSlice'
import{ useNavigate, Link } from 'react-router-dom'

import { debounce } from 'lodash'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



function Login() {

    //get user, isUserLoading, userCredentials from redux store by using useSelector react hook
    //useSelector specifies which variable to read and from which particular reducer
    //useSelector accepts a single function, which we call a selector function. 
    //A selector is a function that takes the entire Redux store state as its argument, reads some value from the state, and returns that result.
    const { user, isUserLoading, userCredentials } = useSelector(selectUserInfo)
    
    //Form state hooks
    const [form, setForm] = useState({}) //holds key value pair for each form field
    const [errors, setErrors] = useState({}) //holds key value pair for each error

    const navigate = useNavigate();

    //set up the dispatch hook in order to call any action from any reducer
    const dispatch = useDispatch()

    

    const submitForm = (e) =>{
        e.preventDefault();

        // get new errors
        const newErrors = findFormErrors()

        //Check the validity to ensure the fields are filled
        if (Object.keys(newErrors).length > 0){
            setErrors(newErrors)
        }
        //Otherwise fetch the sign-up endpoint through redux thunk
        else{   
        e.preventDefault();

        //dispatch the action to sign up a new user with validated credentials
        dispatch(login({'email': userCredentials.email, 'pwd': userCredentials.password}))
                        //dispatched thunk has an unwrap property which can be called to extract the payload of a fulfilled action or to throw the error
                        .unwrap()
                        .then(() => {
                            //if the there are no errors navigate to the home page
                            navigate('/home')
                        })
                        .catch((error) => {
                          // handle error here
                          alert("Dispatch login: " + error)
                        })
        }
    }

    //var handleThrottledInput = debounce(submitForm, 100)

    //function to update each field onchange. Also checks errors for each field
    const setField = (field, value) => {
        //Update the state for current values
        setForm({ ...form, [field]: value })

        //save to user credentials redux store
        if (field === 'email'){
        dispatch(setEmail(value))
        }
        if (field === 'pwd'){
        dispatch(setPassword(value))
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
    const {email, pwd } = form
    const newErrors = {}

    // email errors
    if (!email || email === '') newErrors.email = 'cannot be blank!'

    // password errors
    if (!pwd || pwd === '') newErrors.pwd = 'cannot be blank!'
    else if (pwd.length < 6) newErrors.pwd = 'password is too short!'

    return newErrors
  }

  return (
      <>
        <Container fluid className="login">

            <header>
                <Container>
                    <Row className='justify-content-center text-center'>
                        <Col xs={10}>
                            <nav>
                                <Link to='/home' style={{ textDecoration: 'none' }}>
                                    <p className='hdrSize text-light mb-0 mt-4 fw-lighter border-bottom'>
                                        Food<span className='text-warning'>i</span>
                                    </p>
                                </Link>
                            </nav>
                        </Col>
                    </Row>
                </Container>
            </header>

            <div className=' d-flex justify-content-sm-center justify-content-lg-end  align-items-start vh-100 pe-5 pt-5'>
                
                <Form className='login-form myform text-white mt-5' onSubmit={submitForm}>

                    <div className='d-flex justify-content-center'>
                        <h3 className='space text-dark d-inline-block formHdr bg-warning rounded-pill p-3'>Login</h3>
                    </div>
                    

                    <Form.Group className="mb-5 " controlId="formBasicEmail">
                        <Form.Label className='fw-light' column="lg"><span className='space'>Email address</span></Form.Label>
                        <Form.Control isInvalid={!!errors.email} className=' labelBG bg-dark text-light border-light border-1' size="lg" type="email" placeholder="Enter email" onChange={(e) => {setField('email', e.target.value)}}/>
                        <Form.Control.Feedback type="invalid"> {errors.email} </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-5"  controlId="formBasicPassword">
                        <Form.Label className='fw-light' column="lg"><span className='space'>Password</span></Form.Label>
                        <Form.Control isInvalid={!!errors.pwd}  className=' labelBG form_color form-control bg-dark text-light border-light border-1'  size="lg" type="password" placeholder="Password" onChange={(e) => {setField('pwd', e.target.value)}}/>
                        <Form.Control.Feedback type="invalid">{errors.pwd}</Form.Control.Feedback>
                    </Form.Group>

                    <div className='d-flex justify-content-between mt-4'>
                        <Button variant="outline-warning" type="submit" size="lg">
                            Log in
                        </Button>
                        
                        <nav>
                            <Link to='/sign-up' className='text-light'> Don't have an account? Sign up.</Link>
                        </nav>
                    </div>

                </Form>

            </div>

        </Container>
      </>
  )
}

export default Login
