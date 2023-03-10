import type { NextPage } from "next";
import Head from "next/head";
// import { trpc } from "../utils/trpc";
// import type { inferProcedureOutput } from "@trpc/server";
// import type { AppRouter } from "@acme/api";
// import { useAuth, UserButton } from "@clerk/nextjs";
// import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import Accordion from "../components/Accordion";
import axios from "axios";
import { useQuery } from "react-query";
import { Refresh } from "../components/Refresh";
import Spinner from "../components/Spinner";

// import { useFollowPointer } from "../hooks/useFollowPointer";

// const PostCard: React.FC<{
//   post: inferProcedureOutput<AppRouter["post"]["all"]>[number];
// }> = ({ post }) => {
//   return (
//     <div className="max-w-2xl rounded-lg border-2 border-gray-500 p-4 transition-all hover:scale-[101%]">
//       <h2 className="text-2xl font-bold text-[hsl(280,100%,70%)]">
//         {post.title}
//       </h2>
//       <p>{post.content}</p>
//     </div>
//   );
// };

type Show = {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
};

const Home: NextPage = () => {
  // const postQuery = trpc.post.all.useQuery();

  const [expanded, setExpanded] = useState<false | number>(-1);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);

  const fetchMovies = async () => {
    setIsLoadingRecommendations(true);
    // wait 3 seconds to simulate loading
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const res = await axios.get("/api/movies");
    return res.data;
  };

  const { data: movies, refetch: fetchRecommendations } = useQuery(
    "movies",
    () => fetchMovies(),
    {
      onSuccess: () => {
        setIsLoadingRecommendations(false);
      },
      enabled: false,
    },
  );

  const scrollToResults = () => {
    const element = document.getElementById("results");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    const search = target.search.value;
    await fetchRecommendations();
    scrollToResults();
    console.log(search);
  };

  return (
    <main className="snap max-h-screen snap-y snap-mandatory overflow-y-scroll">
      <Head>
        <title>ShowScouter</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/portal.gif" />
      </Head>
      <section className="flex h-screen snap-center flex-col items-center bg-[url(/bg.gif)] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
          <h1 className="font-orbitron text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Show<span className="text-[#A8CC54]">Scouter</span>
          </h1>
          <h4 className="font-orbitron text-center text-xl italic">
            The portal to your next favorite show
          </h4>
          <div className="relative w-1/2">
            <motion.img
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                default: {
                  duration: 2,
                  ease: [0, 0.71, 0.2, 1.01],
                },
                scale: {
                  type: "spring",
                  damping: 5,
                  stiffness: 100,
                  restDelta: 0.001,
                },
              }}
              src="/portal.gif"
              alt="Portal"
              className="-mt-8 w-full"
            />
            <form
              onSubmit={handleSearch}
              className="absolute inset-y-1/2 flex w-full items-center space-x-4"
            >
              <input
                id="search"
                className="flex-1 rounded-full bg-slate-100 px-4 py-3 text-center text-slate-700 outline-none"
              />
              <button type="submit" className="rounded-full bg-[#0b600e] p-3">
                {isLoadingRecommendations ? (
                  <Spinner />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="white"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
      {movies && (
        <section
          id="results"
          className="flex h-screen snap-center flex-col bg-[url(/bg.gif)] text-white"
        >
          <h1 className="font-orbitron py-8 text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Show<span className="text-[#A8CC54]">Scouter</span>
          </h1>
          <h4 className="font-orbitron text-center text-lg italic">
            Our scouter is coming back with your recommendations!
          </h4>
          <div className="my-auto flex h-screen w-full items-center">
            <motion.img
              initial={{ x: -200 }}
              transition={{ duration: 4 }}
              whileInView={{ x: "55vw" }}
              src="/spaceship.gif"
              className="w-2/3"
            />
            <motion.div
              className="w-full"
              initial={{ x: -1600 }}
              transition={{ duration: 4 }}
              whileInView={{ x: -400 }}
            >
              <Refresh />
              <div className="scrollbar-hide h-[600px] overflow-y-scroll">
                {movies?.map((show: Show, index: number) => (
                  <Accordion
                    key={index}
                    i={index}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    show={show}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { isSignedIn } = useAuth();
//   const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
//     undefined,
//     { enabled: !!isSignedIn },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       {isSignedIn && (
//         <>
//           <p className="text-center text-2xl text-white">
//             {secretMessage && (
//               <span>
//                 {" "}
//                 {secretMessage} click the user button!
//                 <br />
//               </span>
//             )}
//           </p>
//           <div className="flex items-center justify-center">
//             <UserButton
//               appearance={{
//                 elements: {
//                   userButtonAvatarBox: {
//                     width: "3rem",
//                     height: "3rem",
//                   },
//                 },
//               }}
//             />
//           </div>
//         </>
//       )}
//       {!isSignedIn && (
//         <p className="text-center text-2xl text-white">
//           <Link href="/sign-in">Sign In</Link>
//         </p>
//       )}
//     </div>
//   );
// };
