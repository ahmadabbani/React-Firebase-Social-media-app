import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Actions from "./Actions";
const Post = ({ post }) => {
  return (
    <Box
      w="50%"
      className="box"
      p="2"
      bg="gray.100"
      borderRadius="12px"
      mb="15px"
      transition="transform 0.4s ease"
      _hover={{ transform: "scale(1.01)" }}
    >
      <Header post={post} />
      <Text p="15px">{post.text}</Text>
      <Actions post={post} />
    </Box>
  );
};

export default Post;
