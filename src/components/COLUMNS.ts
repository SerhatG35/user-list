import { TableData } from "global";
import { Column } from "react-table";

export const COLUMNS : Column<TableData>[] = [
    {
        Header: "Id",
        accessor: "id"
    },
    {
        Header: "Name",
        accessor: "name"
    },
    {
        Header: "Email",
        accessor: "email"
    },
    {
        Header: "Gender",
        accessor: "gender"
    },
    {
        Header: "Status",
        accessor: "status"
    }
]