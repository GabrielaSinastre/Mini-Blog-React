import React from "react";
import styles from './Search.module.css'
import { useQuery } from "../../hooks/useQuery";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";
import { Link } from "react-router-dom";

const Search = () => {
  const query = useQuery();
  const search = query.get('q');
  const { documents: posts, loading } = useFetchDocuments('posts', search);

  return (
    <div className={styles.search_container}>
      <h2>Search</h2>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts a partir da sua busca...</p>
            <Link to='/' className="btn btn-dark">Voltar</Link>
          </div>
        )}
        {posts && posts.map((post) => (
          <PostDetail post={post} key={post.id} />
        ))}
      </div>
    </div>
  )
}

export default Search;
