import React from "react";
import ReactDOM from "react-dom";
import { Subject } from "rxjs";

import analyticsBus from "home/analytics";

import "./index.css";

analyticsBus.subscribe((evt) => {
  console.log(`analytics: ${JSON.stringify(evt)}`);
});

const Header = React.lazy(() => import("nav/Header"));

const count = new Subject(0);

const useSubject = (subject, initialValue) => {
  const [value, valueSet] = React.useState(initialValue);
  React.useEffect(() => {
    const sub = subject.subscribe(valueSet);
    return () => {
      sub.unsubscribe();
    };
  }, [subject]);
  return value;
};

const App = () => {
  const itemCount = useSubject(count, 0);

  const onAddToCart = () => {
    const value = itemCount + 1;
    analyticsBus.next({ type: "addToCart", value });
    count.next(value);
  };

  return (
    <div>
      <React.Suspense fallback={<div />}>
        <Header count={count} onClear={() => count.next(0)} />
      </React.Suspense>
      <div>Hi there, I'm some cool product.</div>
      <button onClick={onAddToCart}>Buy me!</button>
      <div>Cart count is {itemCount}</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
