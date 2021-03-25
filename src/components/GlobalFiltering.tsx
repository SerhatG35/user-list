import { useColorModeValue } from "@chakra-ui/color-mode";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { useState } from "react";
import { useAsyncDebounce } from "react-table";

type GlobalFilteringProps = {
  filter: any;
  setFilter: Function;
};

export const GlobalFiltering = ({
  filter,
  setFilter,
}: GlobalFilteringProps) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 500);

  const color = useColorModeValue("#2F855A", "#DD6B20");

  return (
    <InputGroup marginBottom="1.25em">
      <InputLeftElement
        pointerEvents="none"
        h="100%"
        w="15%"
        children={<SearchIcon fontSize="sm" color={color} />}
      />
      <Input
        size="sm"
        fontSize="1.1em"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        borderColor={color}
        placeholder="Search"
        textAlign="center"
      ></Input>
    </InputGroup>
  );
};
