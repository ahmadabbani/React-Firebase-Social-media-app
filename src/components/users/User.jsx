import React from "react";
import Avatar from "../Profile/Avatar";
import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import UsernameButton from "../Profile/UsernameButton";
const User = ({ user }) => {
  return (
    <Flex
      direction="column"
      align="center"
      gap="10px"
      border="1px"
      borderColor="gray.400"
      borderRadius="12px"
      py="10px"
    >
      <Flex direction="column">
        <Avatar user={user} size="md" />
        <UsernameButton user={user} />
      </Flex>
      <Button
        as={Link}
        to={`/protected/profile/${user.id}`}
        colorScheme="blue"
        w="80%"
        size="sm"
        variant="outline"
        color="blue"
      >
        View Profile
      </Button>
    </Flex>
  );
};

export default User;
