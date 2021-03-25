import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";

const Action = () => {
  const color = useColorModeValue("#2F855A", "#DD6B20");

  return (
    <Flex>
      <IconButton
        icon={<DeleteIcon />}
        bgColor="red.500"
        size="sm"
        aria-label="Delete user"
        _active={{
          transform: "scale(0.9)",
        }}
      />
      <IconButton
        icon={<EditIcon />}
        ml="0.5em"
        bgColor="blue.500"
        size="sm"
        aria-label="Edit user"
        _active={{
          transform: "scale(0.9)",
        }}
      />
      <IconButton
        icon={<ViewIcon />}
        ml="0.5em"
        bgColor={color}
        size="sm"
        aria-label="Get user post"
        _active={{
          transform: "scale(0.9)",
        }}
      />
    </Flex>
  );
};

export default Action;