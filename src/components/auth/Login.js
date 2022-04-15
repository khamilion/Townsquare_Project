import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFName, setLName, setEmail, selectPostsInfo, setPwd} from '../../redux/credentials'
import{ useNavigate, Link } from 'react-router-dom'
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
    const {email, pwd} = useSelector(selectPostsInfo)
    

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
              body: JSON.stringify({email, pwd})
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

            <div className='d-flex justify-content-sm-center justify-content-lg-end  align-items-start vh-100 pe-5 pt-5'>
                
                <Form className='myform text-white mt-5' onSubmit={submitForm}>
                    <div className='d-flex justify-content-center'>
                        <h3 className='space text-dark d-inline-block formHdr bg-warning rounded-pill p-3'>Login</h3>
                    </div>
                    

                    <Form.Group className="mb-5 " controlId="formBasicEmail">
                        <Form.Label className='fw-light' column="lg"><span className='space'>Email address</span></Form.Label>
                        <Form.Control className=' labelBG bg-dark text-white border-top border-1' size="lg" type="email" placeholder="Enter email" onChange={(e) => {dispatch(setEmail(e.target.value))}}/>
                    </Form.Group>

                    <Form.Group className="mb-5"  controlId="formBasicPassword">
                        <Form.Label className='fw-light' column="lg"><span className='space'>Password</span></Form.Label>
                        <Form.Control className=' labelBG bg-dark text-white border-light border-1'  size="lg" type="password" placeholder="Password" onChange={(e) => {dispatch(setPwd(e.target.value))}}/>
                    </Form.Group>

                    <div className='d-flex justify-content-between mt-4'>
                        <Button variant="outline-warning" type="submit" size="lg">
                            Log in
                        </Button>
                        <nav>
                            <Link to='/SignUp' className='text-light'> Don't have an account? Sign up.</Link>
                        </nav>
                    </div>

                </Form>
            </div>
        </Container>
      </>
  )
}

export default Login
