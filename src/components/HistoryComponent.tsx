import { useColorModeValue } from "@chakra-ui/color-mode";
import { Center } from "@chakra-ui/layout";

const HistoryComponent = () => {
  const bgColor = useColorModeValue("#2F855A", "#DD6B20");

  return (
    <Center
      border="1px solid"
      borderColor={bgColor}
      borderRadius="10px"
      ml="5"
      h="100%"
      width="15em"
      boxShadow="xl"
    >
      this will be history
    </Center>
  );
};

export default HistoryComponent;
