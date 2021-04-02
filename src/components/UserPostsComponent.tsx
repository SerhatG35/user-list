import {
  Center,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { UserPosts } from "global";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

const UserPostsComponent = () => {
  const [userPosts, setUserPosts] = useState<UserPosts[] | undefined>(
    undefined
  );

  const posts = useSelector((state: RootState) => state?.userPosts?.userPosts);

  useEffect(() => {
    setUserPosts(posts);
  }, [posts]);

  useEffect(() => {
    if (userPosts?.length === 0) {
      setUserPosts(undefined);
    }
  }, [userPosts]);

  const bgColor = useColorModeValue("#2F855A", "#DD6B20");

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
                borderColor={bgColor}
                borderRadius="1em"
                key={index}
                fontSize=".75em"
                fontFamily="Archivo"
              >
                <Heading color={bgColor} as="h1" size="md" fontFamily="Archivo">
                  {post?.title}
                </Heading>
                <Text noOfLines={10} fontSize="sm">
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
