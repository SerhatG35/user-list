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
  Center,
} from "@chakra-ui/react";
import { TableData } from "global";
import {
  Column,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { GlobalFiltering } from "./GlobalFiltering";

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
    setGlobalFilter,
    prepareRow,
  } = useTable<TableData>(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, globalFilter } = state;

  const color = useColorModeValue("black", "#fff");
  const bgColor = useColorModeValue("#2F855A", "#DD6B20");
  const colorTh = useColorModeValue("red.500", "#DD6B20");

  // <Editable></Editable>

  return (
    <Center
      flexDirection="column"
      border="1px solid"
      borderColor={bgColor}
      borderRadius="10px"
      p="3"
      h="100%"
      // w="60%"
      w="55em"
      fontFamily="Archivo"
      boxShadow="xl"
    >
      <chakra.span alignSelf="end" w="25%">
        <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} />
      </chakra.span>

      <Table {...getTableProps()} h="85%">
        <Thead>
          {headerGroups?.map((headerGroup) => (
            <Tr {...headerGroup?.getHeaderGroupProps()}>
              {headerGroup?.headers?.map((column) => (
                <Th
                  {...column?.getHeaderProps(column.getSortByToggleProps())}
                  color={colorTh}
                  px="0.75em"
                  py="0"
                  border="none"
                  fontFamily="Archivo"
                  fontWeight="700"
                  fontSize="lg"
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
        <Tbody {...getTableBodyProps()} verticalAlign="top">
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
                        py="0.25em"
                        border="none"
                        fontWeight="500"
                        color={color}
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
        w="90%"
        color={color}
      >
        <chakra.span>
          Page{" "}
          <chakra.strong color={bgColor}>
            {pageIndex + 1} of {pageOptions.length}
          </chakra.strong>
        </chakra.span>

        <chakra.span display="flex" alignItems="center">
          Go to page :
          <NumberInput
            defaultValue={pageIndex + 1}
            min={1}
            max={pageOptions.length}
            size="sm"
            maxW="16"
            ml="2"
            bgColor={bgColor}
            allowMouseWheel={true}
            onChange={(e) => {
              gotoPage(Number(e) - 1);
            }}
          >
            <NumberInputField />
            <NumberInputStepper p="0.1em">
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </chakra.span>

        <Button
          bgColor={bgColor}
          size="sm"
          disabled={!canPreviousPage}
          onClick={() => gotoPage(0)}
          rounded="lg"
        >
          <ArrowLeftIcon />
        </Button>

        <Button
          bgColor={bgColor}
          size="sm"
          disabled={!canPreviousPage}
          onClick={() => previousPage()}
          rounded="lg"
        >
          Previous
        </Button>

        <Button
          bgColor={bgColor}
          size="sm"
          disabled={!canNextPage}
          onClick={() => nextPage()}
          rounded="lg"
        >
          Next
        </Button>

        <Button
          bgColor={bgColor}
          size="sm"
          disabled={!canNextPage}
          onClick={() => gotoPage(pageCount - 1)}
          rounded="lg"
        >
          <ArrowRightIcon />
        </Button>
      </Flex>
    </Center>
  );
};

export default TableComponent;
