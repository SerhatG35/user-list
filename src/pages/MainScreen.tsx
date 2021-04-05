import { Spinner, Center, useColorModeValue } from "@chakra-ui/react";

import { useEffect, useMemo, useState } from "react";

import TableComponent from "src/components/TableComponent";
import { getTableData } from "src/utils/DataFetch";
import { useColor } from "src/context/ColorContext";

import { Pagination, TableData } from "global";
import { COLUMNS } from "src/constants/columns";

const MainScreen = () => {
  const [loading, setloading] = useState(false);
  const [dataTable, setDataTable] = useState<TableData[]>([]);
  const [pagination, setPagination] = useState<Pagination | undefined>(
    undefined
  );
  const { bgColor } = useColor();

  const settingTable = async () => {
    setloading(true);
    let mainData = await getTableData();
    setDataTable(mainData[0]);
    setPagination(mainData[1].pagination);
    setloading(false);
  };
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => dataTable, [dataTable]);

  useEffect(() => {
    settingTable();
  }, []);

  const fontColor = useColorModeValue(bgColor.light, bgColor.dark);

  return (
    <Center
      flexDirection="column"
      border="1px solid"
      borderColor={fontColor}
      borderRadius="lg"
      p="3"
      h="100%"
      w="55em"
      fontFamily="Roboto Mono"
      boxShadow="xl"
      overflowWrap="break-word"
    >
      {loading ? (
        <Spinner size="lg" thickness="2px" color={fontColor} />
      ) : (
        <TableComponent
          columns={columns}
          data={data}
          setDataTable={setDataTable}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
    </Center>
  );
};

export default MainScreen;
