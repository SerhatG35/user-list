import { ChakraProvider } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const MainScreen = lazy(() => import("./pages/MainScreen"));
const Posts = lazy(() => import("./pages/Posts"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/">
            <ChakraProvider>
              <MainScreen />
            </ChakraProvider>
          </Route>
          <Route exact path="/" component={Posts} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
