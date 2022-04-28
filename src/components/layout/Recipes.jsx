import React from 'react'

const Recipes = ({doc}) => {
    //Destructor
    const {id, name, keywords, image, serves, calories, ingredients, instructions, source} = doc 

    console.log(instructions)
    return(<div key={id} className=''>
        
                <p>{name}</p>
                {keywords && keywords.map((item, index) =>  <p key={index}> {item}</p>)}
                <img src={image} alt="pic" height="100px" width="100px"/>
                <p>{serves}</p>
                <p>{calories}</p>
                <p>{ingredients.map((ingred, i) => <span key={i}> {ingred} </span>)}</p>
                <p>{source}</p>
                {
                    Object.keys(instructions).map((instructionStep,i)=>{
                        return (<li key={i}>{instructions[instructionStep]}</li>)
                    })
                }
        
            </div>)   
}

export default Recipes