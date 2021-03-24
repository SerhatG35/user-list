import { Input } from "@chakra-ui/input";
import { chakra } from "@chakra-ui/system";

type ColumnFilteringProps = {
  column: any;
};

export const ColumnFiltering = ({ column }: ColumnFilteringProps) => {
  const { filterValue, setFilter } = column;
  return (
    <chakra.span>
      Search:
      <Input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      ></Input>
    </chakra.span>
  );
};
