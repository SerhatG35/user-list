import { TableData } from "global";
import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "src/components/COLUMNS";
import { getTableData } from "src/utils/DataFetch";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";

const MainScreen = () => {
  const [tableData, setTableData] = useState<TableData[]>();
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => tableData, []);

  const settingTable = async () => {
    setTableData(await getTableData());
  };

  const table = useTable({
    columns: columns,
    data: data as TableData[],
  });

  useEffect(() => {
    settingTable();
  }, []);
  useEffect(() => {
    console.log(tableData);
  }, [tableData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = table;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderGroupProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MainScreen;
