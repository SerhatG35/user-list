import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Center } from "@chakra-ui/layout";
import { useHistory } from "react-router-dom";
import UserPosts from "../components/UserPosts";

const Posts = () => {
  let history = useHistory();
  const bgColor = useColorModeValue("#2F855A", "#DD6B20");

  const goBackFunction = () => {
    history.push("/");
  };

  return (
    <>
      <Center
        border="1px solid"
        borderColor={bgColor}
        borderRadius="10px"
        h="100%"
        w="55em"
        boxShadow="xl"
      >
        <UserPosts />
      </Center>
      <Button pos="absolute" bottom="10" left="10" onClick={goBackFunction}>
        Back
      </Button>
    </>
  );
};

export default Posts;
