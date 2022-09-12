import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

export const AddPostForm = () => {
  const dispatch = useDispatch()

  const users = useSelector(selectAllUsers)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const handlerChangeTitle = (e) => setTitle(e.target.value)
  const handlerChangeContent = (e) => setContent(e.target.value)
  const handlerChangeAuthor = (e) => setUserId(e.target.value)

  const handlerAddPost = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('loading')
        await dispatch(addNewPost({ title, content, user: userId }))
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={handlerChangeTitle}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={handlerChangeAuthor}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={handlerChangeContent}
        />
        <button type="button" onClick={handlerAddPost} disabled={!canSave}>
          Add Post
        </button>
      </form>
    </section>
  )
}
