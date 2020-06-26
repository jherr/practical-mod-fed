import React from "react";
import ReactDOM from "react-dom";
import { Header, Container, Menu, Tab } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import "./index.css";
import "semantic-ui-css/semantic.min.css";

const EmbedPage = React.lazy(() => import("cms/EmbedPage"));
const EmbedEditor = React.lazy(() => import("cms/EmbedEditor"));

const Page = () => {
  const { page } = useParams();
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <EmbedPage page={page} />
    </React.Suspense>
  );
};

const Editor = () => {
  const { page } = useParams();

  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <EmbedEditor page={page} />
    </React.Suspense>
  );
};

const App = () => (
  <Router>
    <Container>
      <Menu fixed="top" inverted style={{ background: "darkgreen" }}>
        <Container style={{ marginTop: "1em", marginBottom: "1em" }}>
          <Header>
            <h1 style={{ color: "white" }}>Home</h1>
          </Header>
        </Container>
      </Menu>
    </Container>
    <Container style={{ paddingTop: "7em", marginBottom: "1em" }}>
      <Switch>
        <Route path="/:page">
          <Tab
            menu={{
              pointing: true,
              color: "blue",
              inverted: true,
            }}
            panes={[
              {
                menuItem: "Display",
                render: () => (
                  <Tab.Pane>
                    <Page />
                  </Tab.Pane>
                ),
              },
              {
                menuItem: "Editor",
                render: () => (
                  <Tab.Pane>
                    <Editor />
                  </Tab.Pane>
                ),
              },
            ]}
          />
        </Route>
        <Route path="/">
          <div>Home</div>
        </Route>
      </Switch>
    </Container>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("app"));
