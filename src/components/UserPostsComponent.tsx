import {
  Center,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

import { UserPosts } from "global";
import { useColor } from "src/context/ColorContext";

const UserPostsComponent = () => {
  const [userPosts, setUserPosts] = useState<UserPosts[] | undefined>(
    undefined
  );
  const { bgColor } = useColor();

  const posts = useSelector((state: RootState) => state?.userPosts?.userPosts);

  useEffect(() => {
    setUserPosts(posts);
  }, [posts]);

  useEffect(() => {
    if (userPosts?.length === 0) {
      setUserPosts(undefined);
    }
  }, [userPosts]);

  const backgroundColor = useColorModeValue(bgColor.light, bgColor.dark);

  return (
    <>
      {userPosts ? (
        <Flex
          w="100%"
          h="100%"
          flexWrap="wrap"
          justify="center"
          overflowY="auto"
        >
          {userPosts?.map((post, index) => {
            return (
              <Center
                d="flex"
                flexDirection="column"
                justifyContent="space-between"
                w="46%"
                h="46%"
                m="1em"
                padding=".75em"
                border="1px solid"
                borderColor={backgroundColor}
                borderRadius="1em"
                key={index}
                fontSize=".75em"
                fontFamily="Roboto Mono"
              >
                <Heading
                  color={backgroundColor}
                  as="h1"
                  size="sm"
                  fontFamily="Roboto Mono"
                >
                  {post?.title}
                </Heading>
                <Text noOfLines={10} fontSize="sm" lineHeight="1.75em">
                  {post?.body}
                </Text>
              </Center>
            );
          })}
        </Flex>
      ) : (
        <Heading>POST NOT FOUND</Heading>
      )}
    </>
  );
};

export default UserPostsComponent;
