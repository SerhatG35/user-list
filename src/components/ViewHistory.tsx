import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex } from "@chakra-ui/layout";

const ViewHistory = () => {
  const bgColor = useColorModeValue("#2F855A", "#DD6B20");
  return (
    <>
      <Flex
        border="1px solid"
        borderColor={bgColor}
        borderRadius="10px"
        ml="5"
        h="100%"
        width="15em"
        boxShadow="xl"
      >
        this will be history
      </Flex>
    </>
  );
};

export default ViewHistory;
