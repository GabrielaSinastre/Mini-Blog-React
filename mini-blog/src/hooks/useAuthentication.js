import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile, 
  signOut 
} from 'firebase/auth'
import { app } from '../firebase/config'; // Import app from the config file
import { useEffect, useState } from 'react'

export const useAuthentication = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const [cancelled, setCancelled] = useState(false) //cleanup - deal with memory leak

  const auth = getAuth(app); // Initialize auth with app

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async(data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null)

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )      
      
      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);
      return user;

    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message)

      let systemErrorMessage
      if (error.message.includes('Password')) {
        systemErrorMessage = 'A senha precisa conter pelo menos 6 caracteres.'
      } else if (error.message.includes('auth/email-already-in-use')) {
        systemErrorMessage = 'E-mail já cadastrado.'
      } else {
        systemErrorMessage = 'Ocorreu um erro. Por favor, tente mais tarde.'
      }
      setLoading(false);
      setError(systemErrorMessage)
    }

  }

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  }

  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage
      if (error.message.includes('user-not-found')) {
        systemErrorMessage = 'Usuário não encontrado.'
      } else if (error.message.includes('wrong-password')) {
        systemErrorMessage = 'Senha incorreta.'
      } else {
        systemErrorMessage = 'Ocorreu um erro. Por favor, tente mais tarde.'
      }

      setLoading(false);
      setError(systemErrorMessage)
    }
  }

  useEffect(() => {
    return () => setCancelled(true);
  }, [])

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login
  }
}