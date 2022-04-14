import React, { useEffect, useState } from 'react'
import Recipes from './Recipes'


function Home() {
     

        const [recipes, setRecipes] = useState(null);

        useEffect(() => {
            //runs once after initial mounting
            fetch('/Home')
            .then((res) => res.json())
            .then((data) => setRecipes(data));
        }, []);
        
  
  return (
      <>
        <div className='container-fluid'>
            <header>
                <h1>Foodi</h1>
            </header>

                   
        <div>        
            {recipes && recipes.map((doc) => 
                <Recipes doc={doc} />

                
            )}
        </div>    

        </div>

      </>
  )
}

export default Home