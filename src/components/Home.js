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

            <header>
                <h1>Foodi</h1>
            </header>

                   
        <div>        
            {recipes && recipes.map((doc) => 
                <Recipes key={doc.id} name={doc.name} keywords={doc.keywords} image={doc.image}
                    serves={doc.serves} calories={doc.calories} ingredients={doc.ingredients}
                    instructions={doc.instructions} source={doc.source} />
            )}
        </div>    



      </>
  )
}

export default Home