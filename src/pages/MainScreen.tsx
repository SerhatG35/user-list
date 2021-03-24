import { TableData } from "global";
import { useEffect, useMemo, useState } from "react";
import { getTableData } from "src/utils/DataFetch";
import { COLUMNS } from "src/components/COLUMNS";
import { Box, Flex } from "@chakra-ui/layout";
import TableComponent from "src/components/TableComponent";

const MainScreen = () => {
  const [dataTable, setDataTable] = useState<TableData[]>([]);
  const settingTable = async () => {
    setDataTable(await getTableData());
  };
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => dataTable, [dataTable]);

  useEffect(() => {
    settingTable();
  }, []);

  return (
    <Box w="100%" h="100vh">
      <Flex
        w="100%"
        h="65%"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        left="50%"
        top="50%"
        transform="translate(-50% ,-50%)"
      >
        <TableComponent columns={columns} data={data} />
        <Flex
          border="1px solid black"
          borderRadius="10px"
          ml="5"
          h="100%"
          width="15em"
        >
          this will be history
        </Flex>
      </Flex>
    </Box>
  );
};

export default MainScreen;
