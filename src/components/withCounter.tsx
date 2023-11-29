import { useState, type FC, useCallback } from "react";

const WithCounter =
  <T,>(WrappedComponent: FC<T>) =>
  (props: T) => {
    const [counter, setCounter] = useState(0);

    const increment = useCallback((num = 1) => {
      setCounter((prev) => prev + num);
    }, []);

    return (
      <WrappedComponent {...props} counter={counter} increment={increment} />
    );
  };

export default WithCounter;
