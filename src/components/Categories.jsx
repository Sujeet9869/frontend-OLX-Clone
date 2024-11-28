import { useNavigate } from 'react-router-dom';
import categories from './CategoriesList';

import './Header.css'

function Categories (props){

      const nevigate  =  useNavigate()

    return(
        <div className=' cat-container' >
            <div>
            <span className='pr-3'>All Categories</span>
            {categories && categories.length > 0 &&
            categories.map((item,index) => {
                return(
                    <span onClick={ () => nevigate('/category/' + item)} key={index} className='category'>{item}</span>
                )
            })
                
                }
          </div>
        </div>
    )
}

export default Categories;