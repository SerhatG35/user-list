import { TableData } from "global";
import { useEffect, useMemo, useState } from "react";
import { getTableData } from "src/utils/DataFetch";
import { COLUMNS } from "src/components/COLUMNS";
import { Box, Flex } from "@chakra-ui/layout";
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
    <Box w="100%" h="100vh">
      <Button
        size="md"
        onClick={toggleColorMode}
        position="absolute"
        right="5"
        top="5"
        rounded="2xl"
        bgColor={bgColor}
      >
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
      <Flex
        w="100%"
        h="60%"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        left="50%"
        top="50%"
        transform="translate(-50% ,-50%)"
      >
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
      </Flex>
    </Box>
  );
};

export default MainScreen;
