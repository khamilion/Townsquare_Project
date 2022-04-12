import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFName, setLName, setEmail, selectPostsInfo} from '../redux/credentials'
import{ useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'


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
            <form className=''>
                <p>Login</p>
                <div className=''>
                    <div className=''>
                        <label htmlFor="fname">First Name</label>
                        <input type="text" name="fname" id="fname" onChange={(e) => {dispatch(setFName(e.target.value))}}/>
                    </div>

                    <div className=''>
                        <label htmlFor="lname">Last Name</label>
                        <input type="text" name="lname" id="lname" onChange={(e) => {dispatch(setLName(e.target.value))}}/>
                    </div>

                    <div className=''>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={(e) => {dispatch(setEmail(e.target.value))}}/>
                    </div>
                </div>
                <button onClick={submitForm}>Login</button>

            </form>
         
      </>
  )
}

export default Login
