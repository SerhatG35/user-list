import { TableData } from "global";
import { useEffect, useMemo, useState } from "react";
import { getTableData } from "src/utils/DataFetch";
import { COLUMNS } from "src/components/COLUMNS";
import { Center, Flex } from "@chakra-ui/layout";
import TableComponent from "src/components/TableComponent";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Button } from "@chakra-ui/button";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const MainScreen = () => {
  const [dataTable, setDataTable] = useState<TableData[]>([]);
  const settingTable = async () => {
    setDataTable(await getTableData());
  };
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => dataTable, [dataTable]);

  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("#2F855A", "#DD6B20");

  useEffect(() => {
    settingTable();
  }, []);

  return (
    <Center w="100%" h="100vh">
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
      <Center w="100%" h="65%">
        <TableComponent columns={columns} data={data} />
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
      </Center>
    </Center>
  );
};

export default MainScreen;
