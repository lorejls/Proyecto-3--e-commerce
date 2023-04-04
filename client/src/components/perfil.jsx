import React, { useEffect, useState } from 'react';
import axios from 'axios'


const Profile = () =>{
    const [user, setUser] = useState({})
    const token = localStorage.getItem('token')

    const getUser = async()=>{
        const response = await axios.get('http://localhost:5000/api/user', {
            headers: {
                Authorization : token
            }
        })
        console.log(response)
    }

    useEffect(()=>{
        getUser()
    },[])

  return (
    <div>Prueba de perfil</div>
  )
}

export default Profile;




