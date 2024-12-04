import React from "react";
import { GetServerSidePropsContext } from "next";
import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';
import { PostProps } from "../../components/Post";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";

export const getServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id), // Ensure ID is passed as a string
    },
    include: {
      author: {
        select: {
          name: true, colour: true
        },
      },
    },
  });

  // Check if the post exists, otherwise return an empty object
  if (!post) {
    return {
      props: {} // Return an empty object if post is not found
    };
  }

  // Return the post as props
  return {
    props: post, // The post data will be passed to the component as props
  };
};

// Your React component for rendering the post
const Post: React.FC<PostProps> = (props) => {
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content || ""} />
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;
