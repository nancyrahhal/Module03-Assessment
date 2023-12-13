import React from 'react'
import ArticleCard from '../Components/ArticleCard.jsx'
import './custom.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ArticlesPage = () => {
    const [article, setarticle]=useState(null);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(()=>{

        const fetcharticle=async()=>{
          try{
            const response = await axios.get(
              "http://localhost:5000/articles/"
            );
        const data = response.data;
        setarticle(data)
        console.log(data)
          }
          catch(error){
            console.log(error);
            setarticle(null)
          }
        }
        fetcharticle();
        
        
        },[])

  return (
    <div className="w-100 vh-100">
    <div className="">
            <input
              type="text"
              className="admin-search px-3"
              placeholder="Search"
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
              style={{color:'white'}}
            />
          </div>
    <div className='campaign-request-card-home-container d-flex flow-row justify-content-center align-items-center gap-5'>

   
    {article &&
     article
     .filter((item) =>
     (searchTerm === "" ||
        (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase()))))
    .map((item, index) => (
 <ArticleCard className="home-campaigns-cards" key={index} data={item} />
))}      
    </div>
    </div>
  )
}

export default ArticlesPage
