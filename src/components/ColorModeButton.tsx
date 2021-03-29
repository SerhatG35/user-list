import { Button } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export interface Props {}

const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("#2F855A", "#DD6B20");
  return (
    <Button
      size="md"
      onClick={toggleColorMode}
      position="absolute"
      right="5"
      top="5"
      rounded="2xl"
      bgColor={bgColor}
      _focus={{
        boxShadow: "none",
      }}
    >
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default ColorModeButton;
