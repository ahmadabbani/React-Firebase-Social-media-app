import { Box, Button, Flex, Heading, Textarea } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useAddPost, useShowPosts } from "../../hooks/posts";
import { useAuth } from "../../hooks/auth";
import PostsList from "../post/PostsList";
import "/src/App.css";
const Dashboard = () => {
  const { register, reset, handleSubmit } = useForm();
  const { addPost, isLoading: addingPostLoading } = useAddPost();
  const { user, isLoading: authLoading } = useAuth();
  function handleAddPost(data) {
    addPost({
      userid: user.id,
      text: data.text,
    });
    reset();
  }
  const { posts, isLoading } = useShowPosts();
  if (isLoading) return "Loading Posts...";
  return (
    <div>
      <Box w="50%" my="30px" className="box">
        <form onSubmit={handleSubmit(handleAddPost)}>
          <Flex justifyContent="space-between" align="end">
            <Heading pb="25px">New Post</Heading>
            <Button
              mb="5px"
              variant="outline"
              color="blue"
              size="sm"
              borderColor="blue"
              type="submit"
              isLoading={authLoading || addingPostLoading}
              loadingText="Posting..."
              style={{ lineHeight: "normal" }}
            >
              Add Post
            </Button>
          </Flex>
          <Textarea
            resize="none"
            placeholder="What's on your mind today?"
            {...register("text", { required: true })}
          ></Textarea>
        </form>
      </Box>
      <PostsList posts={posts} />
    </div>
  );
};

export default Dashboard;
