import { Center, ChakraProvider } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ColorModeButton from "./components/ColorModeButton";
import HistoryComponent from "./components/HistoryComponent";

const MainScreen = lazy(() => import("./pages/MainScreen"));
const Posts = lazy(() => import("./pages/Posts"));

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Center w="100%" h="100vh">
            <Center w="100%" h="65%">
              <ColorModeButton />
              <Switch>
                <Route exact path="/">
                  <MainScreen />
                </Route>
                <Route path="/posts" component={Posts} />
              </Switch>
              <HistoryComponent />
            </Center>
          </Center>
        </Suspense>
      </Router>
    </ChakraProvider>
  );
}

export default App;
