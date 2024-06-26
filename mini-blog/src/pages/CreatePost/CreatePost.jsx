import React, { useState } from 'react'
import styles from './CreatePost.module.css'
import { useInsertDocument } from '../../hooks/useInsertDocuments';
import { useAuthValue } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const { insertDocument, response } = useInsertDocument('posts');
  const { user } = useAuthValue();
  const navigate = useNavigate()
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError('')
    
    try {
      new URL(image)
    } catch (error) {
      setFormError('A imagem precisa ser uma URL.')
    }

    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !tags || !body) {
      setFormError('Por favor, preencha todos os campos!')
    }

    if (formError) return;
    
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    navigate('/')
  }

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input 
            type="text" 
            name='title' 
            required 
            placeholder='Pense em um bom título...' 
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <label>
          <span>URL da imagem:</span>
          <input 
            type="text" 
            name='image' 
            required 
            placeholder='Insira uma imagem que representa o seu post...' 
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </label>

        <label>
          <span>Conteúdo:</span>
          <textarea 
            name='body' 
            required 
            placeholder='Insira o conteúdo do post...' 
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </label>

        <label>
          <span>Tags:</span>
          <input 
            type="text" 
            name='tags' 
            required 
            placeholder='Insira as tags separadas por vírgula' 
            value={tags}
            onChange={(event) => setTags(event.target.value)}
          />
        </label>

        {!response.loading && <button className='btn'>Cadastrar</button>}
        {response.loading && <button className='btn' disabled>Aguarde...</button>}
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost