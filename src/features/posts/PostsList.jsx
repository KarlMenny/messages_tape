import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts, selectPostIds } from './postsSlice'
import { Spinner } from '../../components/Spinner'
import { Post } from './Post'

export const PostsList = () => {
  const orderedPostIds = useSelector(selectPostIds)
  const status = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts())
    }
  }, [status, dispatch])

  let content

  switch (status) {
    case 'loading':
      content = <Spinner text="Loading..." />
      break

    case 'succeeded':
      content = orderedPostIds.map((postId) => (
        <Post key={postId} postId={postId} />
      ))
      break

    case 'failed':
      content = <div>{error}</div>
      break

    default:
      content = null
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
