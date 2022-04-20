import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setEmail, setFName, setLName, setPwd, userInfo} from '../../redux/userSlice'
import{ useNavigate, Link } from 'react-router-dom'
import { debounce } from 'lodash'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

  //import the authentication components
  //import { auth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, 
    //signOut } from '../../firebaseAuth';

function SignUp() {

        //get fname, lname, email from redux store by using useSelector react hook
    //useSelector specifies which variable to read and from which particular reducer
    //useSelector accepts a single function, which we call a selector function. 
    //A selector is a function that takes the entire Redux store state as its argument, reads some value from the state, and returns that result.
    //const {fname, lname, email, pwd} = useSelector(userInfo)
    
    //use state constants for the form inputs
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    //const [profilePic, setProfilePic] = useState('');

    const navigate = useNavigate();

    //set up the dispatch hook in order to call any action from any reducer
    const dispatch = useDispatch()

    

    const submitForm = (e) =>{
        e.preventDefault();
/*
        // Create a new user with Firebase
       createUserWithEmailAndPassword(auth, email, pwd)
       .then((userAuth) => {
       // Update the newly created user with a display name and a picture
         updateProfile(userAuth.user, {
           displayName: (fname + lname),
         })
           .then(
             // Dispatch the user information for persistence in the redux state
             dispatch(
               login({
                 email: userAuth.user.email,
                 uid: userAuth.user.uid,
                 displayName: (fname + lname),
               })
             )
           )
           .catch((error) => {
             console.log('user not updated\n' + error);
           });
       })
       .catch((err) => {
         alert(err);
       });*/


            fetch('/SignUp', {
                method:"POST",
                headers:{
                'Content-Type': 'application/json'
              }, 
              body: JSON.stringify({email, pwd, fname,lname})
            })
              .then(response => response.json())
              .then(data => console.log(data)).catch((error) => {
                console.error(error);
              });
              navigate('/Home')
    }

    //var handleThrottledInput = debounce(submitForm, 100)

   

  return (
   
  <Container fluid className="signup">

    <header>
        <Container>
            <Row className='justify-content-center text-center'>
                <Col xs={10}>
                   
                    <nav>
                        <Link to='/Home' style={{ textDecoration: 'none' }}>
                            <p className='hdrSize text-light mb-0 mt-4 fw-lighter border-bottom'>
                                Food<span className='text-warning'>i</span>
                            </p>
                        </Link>
                    </nav>
                </Col>
            </Row>
        </Container>
    </header>

    <div className='d-flex justify-content-sm-center justify-content-lg-end  align-items-start vh-100 pe-3 pt-5'>

        <Form className='login-form myform text-white mt-5' onSubmit={submitForm}>

                    <div className='d-flex justify-content-center'>
                        <h3 className='space text-dark d-inline-block formHdr bg-warning rounded-pill p-3'>Sign Up</h3>
                    </div>

                  <Row className="mb-3">
                      <Form.Group as={Col} controlId="formFName">
                          <Form.Label className='fw-light' column="lg"><span className='space'>First Name</span></Form.Label>
                          <Form.Control className=' labelBG bg-dark text-white' size="lg" placeholder="John" onChange={(e) => {setFName(e.target.value)}}/>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formLName">
                          <Form.Label className='fw-light' column="lg"><span className='space'>Last Name</span></Form.Label>
                          <Form.Control className=' labelBG bg-dark text-white' size="lg" placeholder="Doe" onChange={(e) => {setLName(e.target.value)}}/>
                      </Form.Group>
                  </Row>

            <Form.Group className="mb-3 " controlId="formBasicEmail">
                <Form.Label className='fw-light' column="lg"><span className='space'>Email address</span></Form.Label>
                <Form.Control className=' labelBG bg-dark text-white border-top border-1' size="lg" type="email" placeholder="johnd@email.com" onChange={(e) => {setEmail(e.target.value)}}/>
            </Form.Group>

            <Form.Group className="mb-3"  controlId="formBasicPassword">
                <Form.Label className='fw-light' column="lg"><span className='space'>Password</span></Form.Label>
                <Form.Control className=' labelBG bg-dark text-white border-light border-1'  size="lg" type="password" placeholder="Password" onChange={(e) => {setPwd(e.target.value)}}/>
            </Form.Group>


            <div className='d-flex justify-content-between mt-4'>
                <Button variant="outline-warning" type="submit" size="lg">
                    Create Account
                </Button>
                <nav>
                    <Link to='/Login' className='text-light'>Already have an account? Log In</Link>
                </nav>
            </div>

        </Form>
    </div>
  </Container>

  )
}

export default SignUp
