import React from "react";
import { useUser } from "../../hooks/users";
import { formatDistanceToNow } from "date-fns";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useDeleteComment } from "../../hooks/comments";
import { useAuth } from "../../hooks/auth";
import Avatar from "../Profile/Avatar";
import UsernameButton from "../Profile/UsernameButton";
import "/src/App.css";
const Comment = ({ comment }) => {
  const { text, uid, date, id } = comment;
  const { user, isLoading } = useUser(uid);
  const { user: authUser, isLoading: authLoading } = useAuth();
  const { deleteComment, isLoading: commentLoading } = useDeleteComment(id);
  if (isLoading) return "Loading...";
  return (
    <Box mb="25px" borderColor="gray.200" className="box">
      <Flex gap="5px" mb="5px">
        <Avatar user={user} size="sm" />
        <Flex direction="column" justify="start">
          {" "}
          <UsernameButton user={user} />{" "}
          <Text color="gray.500" fontSize="11px">
            {formatDistanceToNow(date)} ago
          </Text>
        </Flex>
      </Flex>
      <Flex align="center" justify="space-between" pb="25px">
        <Text>{text}</Text>
        {!authLoading && authUser.id === uid && (
          <IconButton
            colorScheme="red"
            variant="ghost"
            isRound
            icon={<FaTrash />}
            onClick={deleteComment}
            isLoading={commentLoading}
            _loading={{
              cursor: "none",
            }}
          />
        )}
      </Flex>
      <hr></hr>
    </Box>
  );
};

export default Comment;
