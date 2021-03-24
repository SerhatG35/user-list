import { TableData } from "global";
import { Column } from "react-table";
import { ColumnFiltering } from "./ColumnFiltering";

export const COLUMNS: Column<TableData>[] = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
    Filter: ColumnFiltering,
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
  },
];
