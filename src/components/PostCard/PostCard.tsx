"use client";

import { getPosts } from "@/actions/posts.action";
import { Card } from "../ui/card";


type Posts = NonNullable<Awaited<ReturnType<typeof getPosts>>>
type Post = Posts[number]

interface PostCardProps {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card>
      <div>
        {post.content}
      </div>
    </Card>
  );
};

export default PostCard;  