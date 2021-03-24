import {
  ArrowLeftIcon,
  ArrowRightIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Flex,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import { TableData } from "global";
import { Column, usePagination, useSortBy, useTable } from "react-table";

type TableComponentProps = {
  columns: Column<TableData>[];
  data: TableData[];
};

const TableComponent = ({ columns, data }: TableComponentProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    prepareRow,
  } = useTable<TableData>(
    {
      columns,
      data,
      initialState: { pageSize: 20 },
    },
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      border="1px solid black"
      borderRadius="10px"
      p="4"
      height="100%"
    >
      <Table {...getTableProps()} width="60em" height="35em">
        <Thead>
          {headerGroups?.map((headerGroup) => (
            <Tr {...headerGroup?.getHeaderGroupProps()}>
              {headerGroup?.headers?.map((column) => (
                <Th
                  {...column?.getHeaderProps(column.getSortByToggleProps())}
                  color="darkred"
                  px="2"
                  py="0.5"
                  w="0.1%"
                >
                  {column?.render("Header")}
                  <chakra.span pl="2">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page &&
            page?.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row?.getRowProps()}>
                  {row?.cells?.map((cell) => {
                    return (
                      <Td {...cell?.getCellProps()} px="2" py="0.5">
                        {cell?.render("Cell")}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
        </Tbody>
      </Table>
      <Flex
        alignSelf="center"
        justifyContent="space-around"
        alignItems="center"
        w="60%"
      >
        <chakra.span>
          Page{" "}
          <chakra.strong>
            {pageIndex + 1} of {pageOptions.length}
          </chakra.strong>{" "}
        </chakra.span>

        <chakra.span>
          Go to page:{" "}
          <Input
            variant="filled"
            size="sm"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            w="20"
          ></Input>
        </chakra.span>

        <Button disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
          <ArrowLeftIcon />
        </Button>

        <Button disabled={!canPreviousPage} onClick={() => previousPage()}>
          Previous
        </Button>

        <Button disabled={!canNextPage} onClick={() => nextPage()}>
          Next
        </Button>

        <Button disabled={!nextPage} onClick={() => gotoPage(pageCount - 1)}>
          <ArrowRightIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

export default TableComponent;
