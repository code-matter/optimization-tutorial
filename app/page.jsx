import { Suspense } from 'react'

import Posts from '@/components/posts'
import { getPosts } from '@/lib/posts'

// Static Metadata
// export const metadata = {
//     title: 'Latest Posts',
//     description: 'Browse our latest posts.',
// }

// Dynamic Metadata
export const generateMetadata = async config => {
    const posts = await getPosts()
    const numberPosts = posts.length

    return {
        title: `See our ${numberPosts} posts!`,
        description: 'Browse our latest posts',
    }
}

async function LatestPosts() {
    const latestPosts = await getPosts(2)
    return <Posts posts={latestPosts} />
}

export default async function Home() {
    return (
        <>
            <h1>Welcome back!</h1>
            <p>Here's what you might've missed.</p>
            <section id='latest-posts'>
                <Suspense fallback={<p>Loading recent posts...</p>}>
                    <LatestPosts />
                </Suspense>
            </section>
        </>
    )
}
