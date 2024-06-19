'use client'

import { formatDate } from '@/lib/format'
import LikeButton from './like-icon'
import { toggleLike } from '@/actions/actions'
import { useOptimistic } from 'react'
import Image from 'next/image'

const imageLoader = config => {
    const urlStart = config.src.split('upload/')[0]
    const urlEnd = config.src.split('upload/')[1]
    const url = [urlStart, `upload/w_200,q_${config.quality}/`, urlEnd].join('')
    return url
}

function Post({ post, action }) {
    return (
        <article className='post'>
            <div className='post-image'>
                <Image
                    src={post.image}
                    alt={post.title}
                    width={200}
                    height={140}
                    loader={imageLoader}
                    quality={40}
                />
            </div>
            <div className='post-content'>
                <header>
                    <div>
                        <h2>{post.title}</h2>
                        <p>
                            Shared by {post.userFirstName} on{' '}
                            <time dateTime={post.createdAt}>
                                {formatDate(post.createdAt)}
                            </time>
                        </p>
                    </div>
                    <div>
                        <form
                            action={action.bind(null, post.id)}
                            className={post.isLiked ? 'liked' : ''}
                        >
                            <LikeButton />
                        </form>
                    </div>
                </header>
                <p>{post.content}</p>
            </div>
        </article>
    )
}

export default function Posts({ posts }) {
    const [optimisticPosts, triggerOptimisticUpdate] = useOptimistic(
        posts,
        (prevPosts, updatedPostId) => {
            const updatedPostIndex = prevPosts.findIndex(
                p => p.id === updatedPostId
            )
            if (updatedPostId === -1) return prevPosts
            const updatedPost = { ...prevPosts[updatedPostIndex] }
            updatedPost.likes =
                updatedPost.likes + (updatedPost.isLiked ? -1 : 1)
            updatedPost.isLiked = !updatedPost.isLiked
            const newPosts = [...prevPosts]
            newPosts[updatedPostIndex] = updatedPost
            return newPosts
        }
    )
    if (!optimisticPosts || optimisticPosts.length === 0) {
        return <p>There are no posts yet. Maybe start sharing some?</p>
    }

    const updatePost = async postId => {
        triggerOptimisticUpdate(postId)
        await toggleLike(postId)
    }

    return (
        <ul className='posts'>
            {optimisticPosts.map(post => (
                <li key={post.id}>
                    <Post post={post} action={updatePost} />
                </li>
            ))}
        </ul>
    )
}
