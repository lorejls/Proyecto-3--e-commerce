import React, {useEffect} from 'react'

const Logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('companyName')
    localStorage.removeItem('name')

    useEffect(()=>{
        setTimeout(()=>{
            window.location.href='/'
        }, 2000)
    }
        
    )

  return (
    <div>Esperamos verte pronto!</div>
  )
}

export default Logout