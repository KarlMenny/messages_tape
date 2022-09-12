import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updatePost } from './postsSlice'
import { selectPostById } from './postsSlice'

export const EditPostForm = ({ match }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { postId } = match.params
  const post = useSelector((state) => selectPostById(state, postId))

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const handlerChangeTitle = (e) => setTitle(e.target.value)
  const handlerChangeContent = (e) => setContent(e.target.value)

  const handlerUpdatePost = () => {
    if (title && content) {
      dispatch(updatePost({ id: postId, title, content }))
      history.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={handlerChangeTitle}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={handlerChangeContent}
        />
      </form>
      <button type="button" onClick={handlerUpdatePost}>
        Save Post
      </button>
    </section>
  )
}
