import { Button } from "@chakra-ui/button";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";

import { useColor } from "src/context/ColorContext";

const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { bgColor } = useColor();

  const backgroundColor = useColorModeValue(bgColor.light, bgColor.dark);

  return (
    <Button
      size="md"
      onClick={toggleColorMode}
      position="absolute"
      right="5"
      top="5"
      rounded="2xl"
      bgColor={backgroundColor}
      _focus={{
        boxShadow: "none",
      }}
    >
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default ColorModeButton;
