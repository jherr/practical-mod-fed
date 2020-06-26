import React from "react";
import ReactDOM from "react-dom";
import { Header, Container, Menu, Grid } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { useQuery } from "react-query";

import "./index.css";
import "semantic-ui-css/semantic.min.css";

import { fetchPage } from "./api";
import Editor from "./Editor";
import Page from "./Page";

const PageAdmin = () => {
  const { page } = useParams();
  const { data } = useQuery(["getPage", { page }], fetchPage());
  const [fields, setFields] = React.useState({});

  React.useEffect(() => {
    setFields(data);
  }, [data]);

  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Editor
            {...fields}
            page={page}
            onChange={(k, v) => setFields({ ...fields, [k]: v })}
          />
        </Grid.Column>
        <Grid.Column>
          <Page {...fields} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const App = () => (
  <Router>
    <Container>
      <Menu fixed="top" inverted>
        <Container style={{ marginTop: "1em", marginBottom: "1em" }}>
          <Header>
            <h1 style={{ color: "white" }}>CMS Editor</h1>
          </Header>
        </Container>
      </Menu>
    </Container>
    <Container style={{ paddingTop: "7em", marginBottom: "1em" }}>
      <Switch>
        <Route path="/:page">
          <PageAdmin />
        </Route>
        <Route path="/">
          <div>Home</div>
        </Route>
      </Switch>
    </Container>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("app"));
