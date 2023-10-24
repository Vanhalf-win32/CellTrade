import React, {useState, useEffect} from 'react';
import PostService from '../api/PostService';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/MyModal/MyModal';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import PostList from '../components/PostList';
import Pagination from '../components/UI/pagination/Pagination';
import { usePosts } from '../components/hooks/usePosts';
import { useFetching } from '../components/hooks/useFetching';
import { getPageCount } from '../utils/page';
import Loader from '../components/UI/loader/Loader';



export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query:''})
  const [modal, setModal] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching( async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = (response.headers['x-total-count'])
    setTotalPage(getPageCount(totalCount, limit))
  })

  useEffect( () => {
    fetchPosts();
  }, [page])
  
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
 }

 const removePost = (post) => {
    setPosts(posts.filter( p => p.id !== post.id ))
 }

 const changePage = (page) => {
    setPage(page);
 }


  return (
    <div className="App">
      <MyButton style={{marginTop: 10}} onClick={() => setModal(true)}>
        Create post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
         <PostForm create = {createPost}/>
          <hr style = {{margin: '25px'}}/>
      </MyModal>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {
        postError &&
        <div>ERROR! ! ! ${postError} </div>
      }
      {
        isPostsLoading 
        ? <div style ={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
        :
        <PostList 
          remove = {removePost} 
          posts = {sortedAndSearchPosts} 
          listTitle = 'List posts:'/>
      }
      <Pagination
        totalPage={totalPage} 
        page={page} 
        changePage={changePage} />
    </div>      
  )
};
