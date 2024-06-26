import React, { useEffect, useState } from 'react'
import styles from './Register.module.css'
import { useAuthentication } from '../../hooks/useAuthentication'

const Register = () => {
  const { createUser, error: authError, loading } = useAuthentication();
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('')
    
    const user = {
      displayName,
      email,
      password,
    }

    if (password !== confirmPassword) {
      setError('As senhas precisam ser iguais!')
      return;
    }

    const res = await createUser(user);
    console.log(res)
  }

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input 
            type="text" 
            name="displayName" 
            placeholder='Nome do usuário' 
            required
            value={displayName} 
            onChange={(event) => setDisplayName(event.target.value)}
          />
        </label>

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

        <label>
          <span>Confirmação de senha:</span>
          <input 
            type="password" 
            name="confirmPassword" 
            placeholder='Confirme a sua senha' 
            required 
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>
        {!loading && <button className='btn'>Cadastrar</button>}
        {loading && <button className='btn' disabled>Aguarde...</button>}
        {error && <p className='error'>{error}</p>}
      </form>  
    </div>
  )
}

export default Register