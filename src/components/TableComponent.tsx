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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  Column,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";

import { useColor } from "src/context/ColorContext";
import Action from "./Action";

import { GlobalFiltering } from "./GlobalFiltering";
import { Pagination, TableData } from "global";
import { getTablePage } from "src/utils/DataFetch";
import { useEffect } from "react";
import { Debounce, DebounceWithParameter } from "src/utils/Debounce";

type TableComponentProps = {
  columns: Column<TableData>[];
  data: TableData[];
  setDataTable: React.Dispatch<React.SetStateAction<TableData[]>>;
  pagination: Pagination | undefined;
  setPagination: React.Dispatch<React.SetStateAction<Pagination | undefined>>;
};

const TableComponent = ({
  columns,
  data,
  setDataTable,
  pagination,
  setPagination,
}: TableComponentProps) => {
  const { bgColor, color, colorTh } = useColor();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    state,
    setGlobalFilter,
    prepareRow,
  } = useTable<TableData>(
    {
      columns,
      data,
      initialState: {
        pageSize: 20,
        pageIndex: pagination?.page && pagination?.page - 1,
      },
      manualPagination: true,
      pageCount: pagination?.pages,
      pageIndex: pagination?.page,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: "selection",
          Header: "Actions",
          Cell: ({ row, data }: any) => (
            <Action setDataTable={setDataTable} row={row} data={data} />
          ),
        },
      ]);
    }
  );

  const { pageIndex, globalFilter } = state;

  const fontColor = useColorModeValue(color.light, color.dark);
  const backgroundColor = useColorModeValue(bgColor.light, bgColor.dark);
  const colorTableHead = useColorModeValue(colorTh.light, colorTh.dark);

  const goPageIndex = async () => {
    let newData = await getTablePage(pageIndex + 1);
    setPagination(newData[1].pagination);
    setDataTable(newData[0]);
  };

  useEffect(() => {
    goPageIndex();
  }, [pageIndex]);

  return (
    <>
      <chakra.span alignSelf="end" w="25%">
        <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} />
      </chakra.span>
      <Table
        {...getTableProps()}
        h="85%"
        style={{ overflow: "auto", display: "block" }}
      >
        <Thead style={{ overflow: "hidden" }}>
          {headerGroups?.map((headerGroup) => (
            <Tr {...headerGroup?.getHeaderGroupProps()}>
              {headerGroup?.headers?.map((column) => (
                <Th
                  {...column?.getHeaderProps(column.getSortByToggleProps())}
                  color={colorTableHead}
                  px="0.75em"
                  py="0.25em"
                  border="none"
                  fontFamily="Roboto Mono"
                  fontWeight="700"
                  fontSize="xl"
                  fontStyle="italic"
                  verticalAlign="middle"
                >
                  {column?.render("Header")}
                  <chakra.span pl="0.5em">
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
        <Tbody
          {...getTableBodyProps()}
          verticalAlign="top"
          style={{ overflowY: "auto", overflowX: "hidden", height: "400px" }}
        >
          {page &&
            page?.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row?.getRowProps()}>
                  {row?.cells?.map((cell) => {
                    return (
                      <Td
                        {...cell?.getCellProps()}
                        px="0.5em"
                        py="1em"
                        border="none"
                        fontWeight="400"
                        color={fontColor}
                        fontSize="md"
                        verticalAlign="middle"
                        wordBreak="break-word"
                      >
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
        justifyContent="space-evenly"
        alignItems="center"
        w="100%"
        color={fontColor}
        mt="0.5em"
      >
        <chakra.span>
          Page{" "}
          <chakra.strong color={backgroundColor}>
            {pageIndex + 1} of {pagination?.pages}
          </chakra.strong>
        </chakra.span>

        <chakra.span display="flex" alignItems="center">
          Go to page :
          <NumberInput
            defaultValue={pagination?.page}
            min={1}
            max={pagination?.pages}
            size="sm"
            maxW="16"
            ml="2"
            bgColor={backgroundColor}
            allowMouseWheel={true}
            onChange={(e) =>
              setTimeout(() => {
                gotoPage(Number(e) - 1);
              }, 500)
            }
          >
            <NumberInputField />
            <NumberInputStepper p="0.1em">
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </chakra.span>

        <Button
          bgColor={backgroundColor}
          size="sm"
          disabled={!canPreviousPage}
          onClick={DebounceWithParameter(gotoPage, 400, 0)}
          rounded="lg"
        >
          <ArrowLeftIcon />
        </Button>

        <Button
          bgColor={backgroundColor}
          size="sm"
          disabled={!canPreviousPage}
          onClick={Debounce(previousPage, 400)}
          rounded="lg"
        >
          Previous
        </Button>

        <Button
          bgColor={backgroundColor}
          size="sm"
          disabled={!canNextPage}
          onClick={Debounce(nextPage, 400)}
          rounded="lg"
        >
          Next
        </Button>

        <Button
          bgColor={backgroundColor}
          size="sm"
          disabled={!canNextPage}
          onClick={DebounceWithParameter(gotoPage, 400, pageCount - 1)}
          rounded="lg"
        >
          <ArrowRightIcon />
        </Button>
      </Flex>
    </>
  );
};

export default TableComponent;
