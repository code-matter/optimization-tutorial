'use client'
import FormSubmit from '@/components/formSubmit'
import { useFormState } from 'react-dom'

export default function PostForm({ action }) {
    const [formState, formAction] = useFormState(action, {})
    return (
        <>
            <h1>Create a new post</h1>
            <form action={formAction}>
                <p className='form-control'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' id='title' name='title' />
                </p>
                <p className='form-control'>
                    <label htmlFor='image'>Image</label>
                    <input
                        type='file'
                        accept='image/png, image/jpeg'
                        id='image'
                        name='image'
                    />
                </p>
                <p className='form-control'>
                    <label htmlFor='content'>Content</label>
                    <textarea id='content' name='content' rows='5' />
                </p>
                <p className='form-actions'>
                    <FormSubmit />
                </p>
                <ul className='form-errors'>
                    {Object.values(formState).length > 0 &&
                        Object.values(formState).map((error, idx) => {
                            return <li key={idx}>{error}</li>
                        })}
                </ul>
            </form>
        </>
    )
}
