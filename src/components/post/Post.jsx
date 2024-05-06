import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Actions from "./Actions";
const Post = ({ post }) => {
  return (
    <Box
      w="50%"
      className="box"
      p="0"
      border="1px"
      borderColor="gray.400"
      borderRadius="12px"
      mb="15px"
    >
      <Header post={post} />
      <Text p="15px">{post.text}</Text>
      <Actions post={post} />
    </Box>
  );
};

export default Post;
