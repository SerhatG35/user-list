import { ButtonGroup, Button } from "@chakra-ui/button";
import { Stack, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { TableData } from "global";
import { forwardRef, LegacyRef } from "react";

type FormProps = {
  nameRef: React.RefObject<HTMLInputElement>;
  emailRef: React.RefObject<HTMLInputElement>;
  onCancel: any;
  row: any;
  data: TableData[];
  setDataTable: React.Dispatch<React.SetStateAction<TableData[]>>;
};

const TextInput = forwardRef(
  (props: any, ref: LegacyRef<HTMLInputElement> | undefined) => {
    return (
      <FormControl>
        <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
        <Input ref={ref} id={props.id} {...props} />
      </FormControl>
    );
  }
);

export const Form = ({
  nameRef,
  emailRef,
  onCancel,
  row,
  data,
  setDataTable,
}: FormProps) => {
  const saveEdit = () => {
    let myData: TableData[] = [];
    data.forEach((user) => {
      if (row.original.id === user.id && nameRef?.current?.value) {
        let currentNameValue: string = nameRef?.current?.value;
        user.name = currentNameValue;
      }
      if (row.original.email === user.email && emailRef?.current?.value) {
        let currentEmailValue: string = emailRef?.current?.value;
        user.email = currentEmailValue;
      }
      return myData.push(user);
    });
    setDataTable(myData);
  };
  return (
    <Stack spacing={4}>
      <TextInput
        label="Name"
        id={row.original.id}
        ref={nameRef}
        defaultValue={row.original.name}
      />
      <TextInput
        label="Email"
        id={row.original.id + 100}
        ref={emailRef}
        defaultValue={row.original.email}
      />
      <ButtonGroup d="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => saveEdit()} colorScheme="teal">
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
