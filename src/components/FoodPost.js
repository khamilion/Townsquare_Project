import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { setContent, setTitle, selectPostsInfo } from '../redux/credentials'
import{ useNavigate } from 'react-router-dom'

    //const selectCreds = state => state.credential


function FoodPost() {

     
        const navigate = useNavigate();

        //get fname, lname, email from redux store by using useSelector react hook
        //useSelector specifies which variable to read and from which particular reducer
        const {fname, lname, email, title, content} = useSelector(selectPostsInfo)
        console.log({fname, lname, email})
        
        //set up the dispatch hook in order to call any action from any reducer
        const dispatch = useDispatch()

        const submitForm = (e) =>{
            e.preventDefault();
            //Create post to send new blog post to server
            fetch('/FoodPost', {
                method:"POST",
                headers:{
                'Content-Type': 'application/json'
              }, 
              body: JSON.stringify({fname, lname, email, title, content})
            })
              .then(response => response.json())
              .then(data => console.log(data)).catch((error) => {
                console.error( error);
              });
              //navigate('/ShowPosts')
        }

  return (
      <>

            <header>
                <h1>Create a Blog Post</h1>
            </header>


            <form className=''>
               
               <div className="">
                   <div className=''>
                       <label>{fname} {lname}</label>  
                       <label>{email}</label>   
                   </div>

                   <div className=''>
                       <label htmlFor="title">Post Title</label>
                       <input type="text" name="title" id="title" onChange={(e) => dispatch(setTitle(e.target.value))}/>
                   </div>

                   <div className=''>
                       <label htmlFor="content">Post Content</label>
                       <textarea onChange={(e) => {dispatch(setContent(e.target.value))}}></textarea>
                   </div>

               </div>
               <button onClick={submitForm}>Submit</button>

            </form>



      </>
  )
}

export default FoodPost
