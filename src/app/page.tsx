import { getPosts } from "@/actions/posts.action";
import CreatePost from "@/components/CreatePost";
import WhoToFollow from "@/components/WhoToFollow/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();
  console.log(posts)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="col-span-6">
        {user ? <CreatePost/> : null}

        <div className="mt-8">
          {/* {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))} */}
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <WhoToFollow/>
      </div>
    </div>
  );
}
