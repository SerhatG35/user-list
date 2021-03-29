import { Center } from "@chakra-ui/layout";
import { UserPosts } from "global";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

const UserPostsComponent = () => {
  const [userPosts, setUserPosts] = useState<UserPosts[] | undefined>(
    undefined
  );
  const posts = useSelector((state: RootState) => state?.userPosts?.userPosts);

  useEffect(() => {
    console.log(posts);
    setUserPosts(posts);
  }, []);

  return (
    <>
      {userPosts ? (
        <Center w="100%" h="100%" id="ilk">
          {userPosts?.map((post) => {
            <Center
              d="flex"
              flexDirection="column"
              w="25%"
              h="50%"
              border="1px solid black"
            >
              <h2>{post?.title}</h2>
              <p>{post?.body}</p>
            </Center>;
          })}
        </Center>
      ) : (
        <h2>Yok</h2>
      )}
    </>
  );
};

export default UserPostsComponent;
