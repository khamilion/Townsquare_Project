import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFName, setLName, setEmail, selectPostsInfo} from '../redux/credentials'
import{ useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Login() {

    //get fname, lname, email from redux store by using useSelector react hook
    //useSelector specifies which variable to read and from which particular reducer
    //useSelector accepts a single function, which we call a selector function. 
    //A selector is a function that takes the entire Redux store state as its argument, reads some value from the state, and returns that result.
    const {fname, lname, email} = useSelector(selectPostsInfo)
    console.log(fname)

    const navigate = useNavigate();

    //set up the dispatch hook in order to call any action from any reducer
    const dispatch = useDispatch()

    

    const submitForm = (e) =>{
        e.preventDefault();
            fetch('/Login', {
                method:"POST",
                headers:{
                'Content-Type': 'application/json'
              }, 
              body: JSON.stringify({fname, lname, email})
            })
              .then(response => response.json())
              .then(data => console.log(data)).catch((error) => {
                console.error( error);
              });
              navigate('/Home')
    }

    //var handleThrottledInput = debounce(submitForm, 100)

   
  


  return (
      <>
        <Container fluid className="login">

            <header>
                <Container>
                    <Row className='justify-content-center text-center'>
                        <Col xs={10}>
                            <p className='hdrSize text-light mb-0 mt-4 fw-lighter border-bottom'>
                                <span className='text-light'>F</span>
                                <span className='text-light'>o</span>o
                                <span className='text-light'>d</span>
                                <span className='text-warning'>i</span>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </header>

            <div className='d-flex justify-content-sm-center justify-content-md-end  align-items-start vh-100 pe-3 pt-5'>
                <Form className='myform text-white mt-5'>
                    <Form.Group className="mb-5 " controlId="formBasicEmail">

                        <Form.Label className='fw-light' column="lg"><span className='space'>Email address</span></Form.Label>
                        <Form.Control className=' bg-transparent labelBG bg-dark text-light border-top border-1' size="lg" type="email" placeholder="Enter email" />

                    </Form.Group>

                    <Form.Group className="mb-5"  controlId="formBasicPassword">
                        <Form.Label className='fw-light' column="lg"><span className='space'>Password</span></Form.Label>
                        <Form.Control className='bg-transparent labelBG bg-dark text-light border-light border-1'  size="lg" type="password" placeholder="Password" />
                    </Form.Group>

                    <div className='d-flex justify-content-start mt-4'>
                        <Button variant="outline-warning" type="submit" size="lg">
                            Log in
                        </Button>
                    </div>

                </Form>
            </div>
        </Container>
      </>
  )
}

export default Login
