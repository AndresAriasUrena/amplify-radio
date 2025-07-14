import { getPosts } from '../../lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Noticias</h1>
      {posts.map((post) => (
        <article key={post.id} className="mb-8">
          <h2 className="text-xl font-bold mb-2">
            {post.title.rendered}
          </h2>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
        </article>
      ))}
     <Footer />
    </main>
  );
}
