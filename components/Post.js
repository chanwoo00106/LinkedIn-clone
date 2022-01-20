import {
  CloseRounded,
  CommentOutlined,
  DeleteRounded,
  MoreHorizRounded,
  ReplyAllRounded,
  ThumbUpOffAltOutlined,
  ThumbUpOffAltRounded,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modelAtom";
import { getPostState } from "../atoms/postAtom";

/* eslint-disable @next/next/no-img-element */
function Post({ post, modalPost }) {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getPostState);
  const [showInput, setShowInput] = useState(false);
  const [liked, setLiked] = useState(false);
  const { data: session } = useSession();

  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + " ...see more" : string;

  const deletePost = () => {};

  return (
    <div
      className={`bg-white dark:bg-[#1d2226] ${
        modalPost ? "rounded-r-lg" : "rounded-lg"
      } space-y-2 py-2.5 border border-gray-300 dark:border-none`}
    >
      <div className="flex items-center px-2.5 cursor-pointer">
        <Avatar src={post.userImg} className="!h-10 !w-10 cursor-pointer" />
        <div className="mr-auto ml-2 leading-none">
          <h6 className="font-medium hover:text-blue-500 hover:underline">
            {post.username}
          </h6>
          <p className="text-sm dark:text-white//75 opacity-80">{post.email}</p>
        </div>
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseRounded className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRounded className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        )}
      </div>

      {post.input && (
        <div className="px-2.5 break-all md:break-normal">
          {modalPost || showInput ? (
            <p onClick={() => setShowInput(false)}>{post.input}</p>
          ) : (
            <p onClick={() => setShowInput(true)}>
              {truncate(post.input, 150)}
            </p>
          )}
        </div>
      )}

      {post.photoUrl && !modalPost && (
        <img
          src={post.photoUrl}
          alt="photo"
          className="w-full cursor-pointer"
          onClick={() => {
            setModalOpen(true);
            setModalType("gifYouUp");
            setPostState(post);
          }}
        />
      )}

      <div className="flex justify-evenly items-center dark:border-t border-gray-600/80 mx2.5 pt-2 text-black/60 dark:text-white/75">
        {modalPost ? (
          <button className="postButton">
            <CommentOutlined /> <h4>Comment</h4>
          </button>
        ) : (
          <button
            className={`postButton ${liked && "text-blue-500"}`}
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <ThumbUpOffAltRounded className="-scale-x-100" />
            ) : (
              <ThumbUpOffAltOutlined className="-scale-x-100" />
            )}
            <h4>Like</h4>
          </button>
        )}

        {session?.user?.email === post.email ? (
          <button className="postButton focus:text-red-400">
            <DeleteRounded onClick={deletePost} />
            <h4>Delete post</h4>
          </button>
        ) : (
          <button className="postButton">
            <ReplyAllRounded className="-scale-x-100" />
            <h4>Share</h4>
          </button>
        )}
      </div>
    </div>
  );
}

export default Post;
