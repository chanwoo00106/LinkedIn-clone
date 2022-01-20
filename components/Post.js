/* eslint-disable @next/next/no-img-element */
function Post({ post }) {
  return (
    <div>
      <img src={post.photoUrl} alt="postImg" />
      <p>{post.input}</p>
    </div>
  );
}

export default Post;
