import { getPosts } from "@/actions/posts.action";
import { getDBUserId } from "@/actions/user.action";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard/PostCard";
import WhoToFollow from "@/components/WhoToFollow/WhoToFollow";

export default async function Home() {
  const user = await getDBUserId();
  const posts = await getPosts();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="col-span-6">
        {user ? <CreatePost/> : null}

        <div className="mt-8 flex flex-col gap-6">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} dbUserId={user ?? null} />
          ))}
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <WhoToFollow/>
      </div>
    </div>
  );
}
