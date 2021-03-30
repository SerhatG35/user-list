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
    console.log(posts, " posts");
    if (posts === []) {
      setUserPosts(undefined);
    } else {
      setUserPosts(posts);
    }
  }, []);

  useEffect(() => {
    console.log(userPosts, " userPosts");
  }, [userPosts]);

  const bgColor = useColorModeValue("#2F855A", "#DD6B20");

  return (
    <>
      {userPosts ? (
        <Flex w="100%" h="100%">
          {userPosts?.map((post, index) => {
            return (
              <Center
                d="flex"
                flexDirection="column"
                justifyContent="space-between"
                w="50%"
                h="50%"
                m="1em"
                padding=".75em"
                border="1px solid"
                borderColor={bgColor}
                borderRadius="1em"
                key={index}
                fontSize=".75em"
                fontFamily="Archivo"
              >
                <Heading color={bgColor} as="h1" size="md">
                  {post?.title}
                </Heading>
                <Text fontSize="sm">{post?.body}</Text>
              </Center>
            );
          })}
        </Flex>
      ) : (
        <h2>Yok</h2>
      )}
    </>
  );
};

export default UserPostsComponent;
