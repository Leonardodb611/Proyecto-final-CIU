import React, { useState, useEffect } from 'react'


function Users() {
    const [users, setUsers] = useState([])

    async function obtenerUsuarios(){
    try{
        const response = await fetch('http://localhost:3001/users')
        const data = await response.json()
        setUsers(data)
    }
    catch{
        console.error("error");
        
    }
    }

    function listarUsuarios(){
        return (
            users.map((cli) => (
        <div key={cli.id}>
        <p>{cli.id}</p>
        <p>{cli.nickName}</p>
        </div>
        ))
        )
    }

    useEffect(() => {
    obtenerUsuarios();
    }, []);
  
  return (
    
    <div>
        {listarUsuarios()}
    </div>

  )
}

export default Users