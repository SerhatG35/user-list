import { useColorModeValue } from "@chakra-ui/color-mode";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";

import { useState } from "react";
import { useAsyncDebounce } from "react-table";

import { useColor } from "src/context/ColorContext";

type GlobalFilteringProps = {
  filter: any;
  setFilter: Function;
};

export const GlobalFiltering = ({
  filter,
  setFilter,
}: GlobalFilteringProps) => {
  const [value, setValue] = useState(filter);
  const { bgColor } = useColor();

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 500);

  const backgroundColor = useColorModeValue(bgColor.light, bgColor.dark);

  return (
    <InputGroup marginBottom="1em">
      <InputLeftElement
        pointerEvents="none"
        h="100%"
        w="15%"
        children={<SearchIcon fontSize="sm" color={backgroundColor} />}
      />
      <Input
        size="sm"
        fontSize="1.1em"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        borderColor={backgroundColor}
        placeholder="Search"
        textAlign="center"
        borderRadius="lg"
      ></Input>
    </InputGroup>
  );
};
