import React, { useState } from 'react'
import styles from './Home.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetail from '../../components/PostDetail';

function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { documents: posts, loading } = useFetchDocuments('posts')

  const handleSubmit = (event) => {
    event.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  }

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input 
          type="text" 
          name="search" 
          placeholder='Ou busque por tags...'
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>  

      <div>
        <h1>Posts...</h1>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) =>(
          <PostDetail key={post.id} post={post}/>
        ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to='/posts/create' className='btn'>Criar primeiro post</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home