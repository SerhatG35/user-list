import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { pushHistory, setUser } from "src/redux/userSlice";
import { getUserPosts } from "src/utils/DataFetch";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Form } from "./Form";
import { TableData } from "global";

type ActionProps = {
  row: any;
  data: TableData[];
  setDataTable: React.Dispatch<React.SetStateAction<TableData[]>>;
};

const Action = ({ row, data, setDataTable }: ActionProps) => {
  const dispatch = useDispatch();

  const { onOpen, onClose, isOpen } = useDisclosure();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const color = useColorModeValue("#2F855A", "#DD6B20");

  const handleDeleteUser = (userID: number) => {
    let myData: TableData[] = [];
    data.forEach((user) => {
      if (user.id !== userID) {
        return myData.push(user);
      }
    });
    setDataTable(myData);
  };

  const handleUserPosts = async () => {
    dispatch(setUser(await getUserPosts(row.original.id)));
    dispatch(pushHistory(row.original));
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
      <Link to="/posts">
        <IconButton
          onClick={() => {
            handleUserPosts();
          }}
          icon={<ViewIcon />}
          ml="0.5em"
          bgColor={color}
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
