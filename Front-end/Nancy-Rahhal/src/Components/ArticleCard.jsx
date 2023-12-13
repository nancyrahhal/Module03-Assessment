import React from 'react'
import '../Pages/custom.scss';


const ArticleCard = ({data}) => {
  return (
    <>
    <div className="campaign-request-card-home p-0 rounded-4 d-flex flex-column">
        <img src={`http://localhost:5000/uploads/${data.image}`} className="campaign-pic-home w-100 p-0 relative "></img>
        <div className="campaign-category-home p-1">{data.category}</div>
        <h3 className="campaign-title-home h3 m-0 py-2 relative text-center">{data.title}</h3>
        <p className='px-3 py-1 campaign-description-home text-center'>{data.body}</p>
        <div className='mt-auto mb-4 d-flex flex-column align-items-center justify-content-center'>
          <p className='campaign-owner-home text-center'>Written by: <span>{data.author}</span></p>
          <button type="button" className="btn btn-primary donate-button-home px-5">Show Campaign</button>
        </div>
      </div>
      </>
  )
}

export default ArticleCard
