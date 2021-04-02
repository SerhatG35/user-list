import { useColorModeValue } from "@chakra-ui/color-mode";
import { Text, Center, Heading, Flex, IconButton } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { UserHistory } from "global";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { setUser } from "src/redux/userSlice";
import { getUserPosts } from "src/utils/DataFetch";
import { Link } from "react-router-dom";

const HistoryComponent = () => {
  const [userHistory, setUserHistory] = useState<UserHistory[] | undefined>(
    undefined
  );
  const history = useSelector((state: RootState) => state.history.history);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserHistory(history);
  }, [history]);

  const goUserPosts = async (userID: number) => {
    dispatch(setUser(await getUserPosts(userID)));
  };

  const bgColor = useColorModeValue("#2F855A", "#DD6B20");

  return (
    <Flex
      border="1px solid"
      borderColor={bgColor}
      borderRadius="10px"
      ml="5"
      h="100%"
      width="15em"
      boxShadow="xl"
      flexDir="column"
      p="0.75em"
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
                h="20%"
                border="2px solid"
                borderColor={
                  trackedUser?.gender === "Male" ? "blue.500" : "pink.400"
                }
                borderRadius="lg"
                mt="0.5em"
              >
                <Heading size="sm" fontFamily="Archivo">
                  {trackedUser?.name}
                </Heading>
                <Text>{trackedUser?.status}</Text>
                <Text>user id : {trackedUser?.id}</Text>
                <Link to="/posts">
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
