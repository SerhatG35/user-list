import { Center, ChakraProvider, Text } from "@chakra-ui/react";

import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ColorModeButton from "./components/ColorModeButton";
import HistoryComponent from "./components/HistoryComponent";
import { ColorContextProvider } from "./context/ColorContext";

import { format } from "date-fns";

const MainScreen = lazy(() => import("./pages/MainScreen"));
const Posts = lazy(() => import("./pages/Posts"));

function App() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setInterval(() => {
      setDate(format(new Date(), "PPpp"));
    }, 1000);
    return () => {
      clearInterval();
    };
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <ChakraProvider>
          <ColorContextProvider>
            <Center w="100%" h="100vh" fontFamily="Roboto Mono" id="endıs">
              <Text position="absolute" top="5" left="5">
                {date}
              </Text>
              <Center w="100%" h="65%">
                <ColorModeButton />
                <Switch>
                  <Route exact path="/" component={MainScreen} />
                  <Route path="/posts/:id" component={Posts} />
                </Switch>
                <HistoryComponent />
              </Center>
            </Center>
          </ColorContextProvider>
        </ChakraProvider>
      </Suspense>
    </Router>
  );
}

export default App;
