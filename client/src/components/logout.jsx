import React, {useEffect} from 'react';
import Logo2 from '../components/img/LOGO-goodbye.png'

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
    <div className="main-container">
      <h2 className='saludo-home'>¡Esperamos verte pronto!</h2>
      <div className='image'>
      <img className='top bottom' src={Logo2} alt="logo adiós" /></div>
    </div>
  )
}

export default Logout