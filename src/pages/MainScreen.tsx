import { TableData } from "global";
import { useEffect, useMemo, useState } from "react";
import { getTableData } from "src/utils/DataFetch";
import { COLUMNS } from "src/components/COLUMNS";
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

  return <TableComponent columns={columns} data={data} />;
};

export default MainScreen;
