import { TableData } from "global";
import { useEffect, useMemo, useState } from "react";
import { getTableData } from "src/utils/DataFetch";
import { COLUMNS } from "src/constants/COLUMNS";
import TableComponent from "src/components/TableComponent";
import { Spinner, Center, useColorModeValue } from "@chakra-ui/react";

const MainScreen = () => {
  const [loading, setloading] = useState(false);
  const [dataTable, setDataTable] = useState<TableData[]>([]);
  const settingTable = async () => {
    setloading(true);
    setDataTable(await getTableData());
    setloading(false);
  };
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => dataTable, [dataTable]);

  useEffect(() => {
    settingTable();
  }, []);

  const bgColor = useColorModeValue("#2F855A", "#DD6B20");

  return (
    <Center
      flexDirection="column"
      border="1px solid"
      borderColor={bgColor}
      borderRadius="10px"
      p="3"
      h="100%"
      w="55em"
      fontFamily="Archivo"
      boxShadow="xl"
    >
      {loading ? (
        <Spinner size="lg" thickness="5px" color={bgColor} />
      ) : (
        <TableComponent columns={columns} data={data} setDataTable={setDataTable}/>
      )}
    </Center>
  );
};

export default MainScreen;
