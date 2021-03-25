import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex } from "@chakra-ui/layout";

const Action = () => {
  const color = useColorModeValue("#2F855A", "#DD6B20");

  return (
    <Flex>
      <IconButton bgColor={color} size="sm" aria-label="Get post" />
      <IconButton ml="0.5em" bgColor={color} size="sm" aria-label="Get post" />
    </Flex>
  );
};

export default Action;
