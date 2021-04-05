import { Center, ChakraProvider } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ColorModeButton from "./components/ColorModeButton";
import HistoryComponent from "./components/HistoryComponent";
import { ColorContextProvider } from "./context/ColorContext";

const MainScreen = lazy(() => import("./pages/MainScreen"));
const Posts = lazy(() => import("./pages/Posts"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <ChakraProvider>
          <ColorContextProvider>
            <Center w="100%" h="100vh" fontFamily="Roboto Mono" id="endıs">
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
