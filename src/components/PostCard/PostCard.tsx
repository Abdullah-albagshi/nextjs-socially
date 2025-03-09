"use client";

import { getPosts } from "@/actions/posts.action";


interface PostCardProps {
  post: Awaited<ReturnType<typeof getPosts>>
}

const PostCard = ({ post }: PostCardProps) => {
  return <div>PostCard</div>;
};

export default PostCard;  