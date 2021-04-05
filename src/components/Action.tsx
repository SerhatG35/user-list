import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { setUser } from "src/redux/userSlice";

import { useRef } from "react";
import { Link } from "react-router-dom";

import { getUserPosts } from "src/utils/DataFetch";
import { Form } from "./Form";
import { TableData } from "global";
import { useColor } from "src/context/ColorContext";
import { setHistory } from "src/redux/historySlice";

type ActionProps = {
  row: any;
  data: TableData[];
  setDataTable: React.Dispatch<React.SetStateAction<TableData[]>>;
};

const Action = ({ row, data, setDataTable }: ActionProps) => {
  const dispatch = useDispatch();
  const { bgColor } = useColor();

  const { onOpen, onClose, isOpen } = useDisclosure();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const backgroundColor = useColorModeValue(bgColor.light, bgColor.dark);

  const handleDeleteUser = (userID: number) => {
    setDataTable(data.filter((user) => user.id !== userID));
  };

  const handleUserPosts = async () => {
    dispatch(setUser(await getUserPosts(row.original.id)));
    dispatch(setHistory(row.original));
  };

  return (
    <Flex>
      <IconButton
        icon={<DeleteIcon />}
        bgColor="red.500"
        size="sm"
        aria-label="Delete user"
        _active={{
          transform: "scale(0.9)",
        }}
        onClick={() => handleDeleteUser(row.original.id)}
        _focus={{
          boxShadow: "none",
        }}
      />
      <>
        <Popover
          isOpen={isOpen}
          initialFocusRef={nameRef}
          onOpen={onOpen}
          onClose={onClose}
          placement="top"
          closeOnBlur={true}
        >
          <PopoverTrigger>
            <IconButton
              ml="0.5em"
              bgColor="blue.500"
              aria-label="Edit user"
              size="sm"
              icon={<EditIcon />}
              _active={{
                transform: "scale(0.9)",
              }}
              _focus={{
                boxShadow: "none",
              }}
            />
          </PopoverTrigger>
          <PopoverContent p={5}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form
              nameRef={nameRef}
              emailRef={emailRef}
              onCancel={onClose}
              row={row}
              data={data}
              setDataTable={setDataTable}
            />
          </PopoverContent>
        </Popover>
      </>
      <Link to={`posts/${row.original.id}`}>
        <IconButton
          onClick={() => {
            handleUserPosts();
          }}
          icon={<ViewIcon />}
          ml="0.5em"
          bgColor={backgroundColor}
          size="sm"
          aria-label="Get user post"
          _active={{
            transform: "scale(0.9)",
          }}
          _focus={{
            boxShadow: "none",
          }}
        />
      </Link>
    </Flex>
  );
};

export default Action;
