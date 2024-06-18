'use server'

import { uploadImage } from '@/lib/cloudinary'
import { storePost, updatePostLikeStatus } from '@/lib/posts'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(prevState, formData) {
    const title = formData.get('title')
    const image = formData.get('image')
    const content = formData.get('content')
    let errors = { title: undefined, content: undefined, image: undefined }
    if (!title || title.trim().length === 0) {
        errors.title = 'Title is required'
    }
    if (!content || content.trim().length === 0) {
        errors.content = 'Content is required'
    }
    if (!image || image.size === 0) {
        errors.image = 'Image is required'
    }
    if (Object.values(errors).some(e => e)) {
        return errors
    }
    try {
        const imgURL = await uploadImage(image)
        await storePost({
            imageUrl: imgURL,
            title,
            content,
            userId: 1,
        })
    } catch (error) {
        throw new Error('Upload failed.. Please try again.')
    } finally {
        revalidatePath('/feed', 'page')
        redirect('/feed')
    }
}

export const toggleLike = async postId => {
    updatePostLikeStatus(postId, 2)
    revalidatePath('/', 'layout')
}
