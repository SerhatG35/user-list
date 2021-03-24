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
  Input,
  Box,
} from "@chakra-ui/react";
import { TableData } from "global";
import {
  Column,
  useFilters,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

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
      initialState: { pageSize: 5 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const { pageIndex } = state;

  const color = useColorModeValue("#171923", "#A0AEC0");
  const bgColor = useColorModeValue("#BEE3F8", "red.500");

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
      border="1px solid"
      borderColor={bgColor}
      borderRadius="10px"
      p="4"
      h="100%"
      w="50em"
      fontFamily="Lora"
      boxShadow="xl"
    >
      {/* <Input w="20%" size="sm"></Input> */}
      <Table {...getTableProps()} h="80%">
        <Thead>
          {headerGroups?.map((headerGroup) => (
            <Tr {...headerGroup?.getHeaderGroupProps()}>
              {headerGroup?.headers?.map((column) => (
                <Th
                  {...column?.getHeaderProps(column.getSortByToggleProps())}
                  color="red.500"
                  px="2"
                  py="0.5"
                  w="3%"
                  fontFamily="Lora"
                  fontWeight="600"
                  fontSize="sm"
                  fontStyle="italic"
                  pb="2"
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
                      <Td
                        {...cell?.getCellProps()}
                        px="2"
                        py="0.5"
                        border="none"
                        fontWeight="400"
                        color={color}
                        fontSize="sm"
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
        justifyContent="space-around"
        alignItems="center"
        w="100%"
        color={color}
      >
        <chakra.span>
          Page{" "}
          <chakra.strong>
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
          rounded="xl"
        >
          <ArrowLeftIcon />
        </Button>

        <Button
          bgColor={bgColor}
          size="sm"
          disabled={!canPreviousPage}
          onClick={() => previousPage()}
          rounded="xl"
        >
          Previous
        </Button>

        <Button
          bgColor={bgColor}
          size="sm"
          disabled={!canNextPage}
          onClick={() => nextPage()}
          rounded="xl"
        >
          Next
        </Button>

        <Button
          bgColor={bgColor}
          size="sm"
          disabled={!canNextPage}
          onClick={() => gotoPage(pageCount - 1)}
          rounded="xl"
        >
          <ArrowRightIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

export default TableComponent;
