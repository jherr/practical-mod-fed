import React from "react";
import { Form, Input, Button, TextArea } from "semantic-ui-react";
import { useMutation } from "react-query";

import { postPage } from "./api";

const Editor = ({
  title,
  text,
  img1,
  img2,
  img3,
  page,
  onChange,
  host = "",
}) => {
  const [mutate] = useMutation(postPage(host));
  const onSave = () => {
    mutate({
      page,
      title,
      text,
      img1,
      img2,
      img3,
    });
  };
  return (
    <Form>
      <Input
        placeholder="Title"
        value={title}
        style={{ width: "100%", marginBottom: "1em" }}
        onChange={(evt) => onChange("title", evt.target.value)}
      />
      <TextArea
        placeholder="Description"
        value={text}
        style={{ width: "100%", marginBottom: "1em" }}
        onChange={(evt) => onChange("text", evt.target.value)}
      />
      <Input
        placeholder="Image 1"
        value={img1}
        style={{ width: "100%", marginBottom: "1em" }}
        onChange={(evt) => onChange("img1", evt.target.value)}
      />
      <Input
        placeholder="Image 2"
        value={img2}
        style={{ width: "100%", marginBottom: "1em" }}
        onChange={(evt) => onChange("img2", evt.target.value)}
      />
      <Input
        placeholder="Image 3"
        value={img3}
        style={{ width: "100%", marginBottom: "1em" }}
        onChange={(evt) => onChange("img3", evt.target.value)}
      />
      <Button
        type="primary"
        onClick={onSave}
        style={{
          marginTop: "1em",
        }}
        primary
      >
        Save
      </Button>
    </Form>
  );
};

export default Editor;
