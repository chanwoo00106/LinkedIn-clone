import { AnimatePresence } from "framer-motion";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modelAtom";
import { connectToDatabase } from "../util/mongodb";
import News from "../components/News";

export default function Home({ posts, news }) {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

  return (
    <div className="bg-[#f3f2ef] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>LinkedIn</title>
      </Head>
      <Header />
      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-x-5">
          <Sidebar />
          <Feed posts={posts} />
        </div>
        <News news={news} />

        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      permanent: false,
      destination: "home",
    };
  }

  const { db } = await connectToDatabase();
  const posts = await db
    .collection("posts")
    .find()
    .sort({ timestamp: -1 })
    .toArray();

  const news = await fetch(
    `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${process.env.NEWS_API}`
  ).then((res) => res.json());

  return {
    props: {
      news: news.articles,
      session,
      posts: posts.map((post) => ({
        _id: post._id.toString(),
        input: post.input,
        photoUrl: post.photoUrl,
        email: post.email,
        username: post.username,
        userImg: post.userImg,
        createdAt: post.createdAt,
      })),
    },
  };
}
