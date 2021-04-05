import { useColorModeValue } from "@chakra-ui/color-mode";
import { Text, Center, Heading, Flex, IconButton } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { setUser } from "src/redux/userSlice";
import { getUserPosts } from "src/utils/DataFetch";
import { Link } from "react-router-dom";
import { useColor } from "src/context/ColorContext";
import useUserHistory from "../hooks/useUserHistory";

const HistoryComponent = () => {
  const dispatch = useDispatch();
  const { bgColor } = useColor();
  const userHistory = useUserHistory();

  const goUserPosts = async (userID: number) => {
    dispatch(setUser(await getUserPosts(userID)));
  };

  const backgroundColor = useColorModeValue(bgColor.light, bgColor.dark);

  return (
    <Flex
      border="1px solid"
      borderColor={backgroundColor}
      borderRadius="10px"
      ml="5"
      h="100%"
      width="15em"
      boxShadow="xl"
      flexDir="column"
      p="0.75em"
      overflowY="auto"
    >
      {userHistory && (
        <>
          {userHistory?.map((trackedUser, index) => {
            return (
              <Center
                display="flex"
                flexDir="column"
                key={index}
                w="100%"
                h="25%"
                border="1px solid"
                borderColor={
                  trackedUser?.gender === "Male" ? "blue.500" : "pink.400"
                }
                borderRadius="lg"
                mt="0.5em"
                p="0.1em"
              >
                <Heading
                  size="sm"
                  fontFamily="Roboto Mono"
                  textAlign="center"
                  color={
                    trackedUser?.gender === "Male" ? "blue.500" : "pink.400"
                  }
                >
                  {trackedUser?.name}
                </Heading>
                <Text>{trackedUser?.status}</Text>
                <Text>user id : {trackedUser?.id}</Text>
                <Link to={`/posts/${trackedUser?.id}`}>
                  <IconButton
                    size="sm"
                    bgColor={
                      trackedUser?.gender === "Male" ? "blue.500" : "pink.400"
                    }
                    aria-label="Go to user posts"
                    icon={<ViewIcon />}
                    onClick={() => goUserPosts(trackedUser?.id)}
                  />
                </Link>
              </Center>
            );
          })}
        </>
      )}
    </Flex>
  );
};

export default HistoryComponent;
