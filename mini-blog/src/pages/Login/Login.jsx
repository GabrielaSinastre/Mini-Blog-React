import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import { useAuthentication } from '../../hooks/useAuthentication'

const Login = () => {
  const { login, error: authError, loading } = useAuthentication();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('')
    
    const user = {
      email,
      password,
    }

    const res = await login(user);
    console.log(res)
  }

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para poder visualizar o sistema.</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input 
            type="email" 
            name="email" 
            placeholder='E-mail do usuário' 
            required 
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label>
          <span>Senha:</span>
          <input 
            type="password" 
            name="password" 
            placeholder='Insira sua senha' 
            required 
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {!loading && <button className='btn'>Entrar</button>}
        {loading && <button className='btn' disabled>Aguarde...</button>}
        {error && <p className='error'>{error}</p>}
      </form>  
    </div>
  )
}

export default Login