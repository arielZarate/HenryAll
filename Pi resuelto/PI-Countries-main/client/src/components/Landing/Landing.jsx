import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

export function Landing() {
  return (
 <div className='container'>
      <div className='infoContainer'>
        <h1> Welcome World</h1>
    
        <Link  to="/Home"   className=' btn btn-dark text-md-start h2'>
              Start
            </Link>

      </div>
 </div>
  )
}

