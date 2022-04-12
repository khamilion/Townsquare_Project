import React from 'react'

const Recipe = (props) => {
    //Destructor
    const {name, keywords, image, serves, calories, ingredients, instructions, source} = props 

    return(<div className=''>
        
                <p>{name}</p>
                {/*keywords.map((item) =>  <p>{item}</p>)*/}
                <img src={image} alt="pic" height="100px" width="100px"/>
                <p>{serves}</p>
                <p>{calories}</p>
                <p>{ingredients}</p>
                <p>{source}</p>
        
            </div>)   
}

export default Recipe