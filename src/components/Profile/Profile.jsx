import React from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/users";
import PostsList from "../post/PostsList";
import { useShowPosts } from "../../hooks/posts";
import {
  Button,
  Flex,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import Avatar from "./Avatar";
import EditProfile from "./EditProfile";
import { format } from "date-fns";
import { useAuth } from "../../hooks/auth";
import UsernameButton from "./UsernameButton";

const Profile = () => {
  const { id } = useParams();
  const { user, isLoading: userLoading } = useUser(id);
  const { posts, isLoading: postsLoading } = useShowPosts(id);
  const { user: authUser, isLoading: authLoading } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallScreen] = useMediaQuery("(max-width: 595px)");

  if (userLoading) return "Loading";

  return (
    <>
      <Flex
        justify="space-between"
        w="50%"
        align="end"
        mt="30px"
        className="flex"
      >
        <Flex direction="column" align="center">
          <Avatar user={user} size="lg" />
          <UsernameButton user={user} />
        </Flex>
        {!authLoading && authUser.id === user.id && (
          <Button
            onClick={onOpen}
            variant="outline"
            color="blue.600"
            size={isSmallScreen ? "sm" : "md"}
            borderWidth="1px"
            borderColor="blue.600"
            type="submit"
          >
            Change Picture
          </Button>
        )}
      </Flex>
      <Flex gap="55px" pt="5px" mb="30px" className="profileFlex">
        <Text>
          <strong>Posts:</strong> {posts.length}
        </Text>
        <Text>
          <strong>Likes:</strong> To do!!
        </Text>
        <Text>
          {" "}
          <strong>Joined:</strong> {format(user.date, "MMM yyy")}
        </Text>
        <EditProfile isOpen={isOpen} onClose={onClose} />
      </Flex>
      {postsLoading ? (
        <Text>Posts are Loading...</Text>
      ) : (
        <PostsList posts={posts} />
      )}
    </>
  );
};

export default Profile;
