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
          <ChakraProvider>
            <Route exact path="/" component={MainScreen} />
            <Route path="/posts" component={Posts} />
          </ChakraProvider>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
