// 1. Start with useEffect with delay dependency - straightforward
// 2. Move to implement useEffect with callback dependency - which should only update the callbackref and not reset the setInterval
const useInterval = (callback, delay) => {
  const callbackRef = useRef(null);

  // When callback updates we don't want to clear the interval but only want to update the callback fn
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // edge case - if no delay is set then don't do anything
    if (!delay) return;
    // 🚨 Note: callbackRef.current() should be called as a fn instead of callbackRef.current because setInterval which itself is a function, it should not capture the current value of callbackRef.current but it should rather have a reference to the fn callbackRef.current() which can change when callback is updated
    const intervalID = setInterval(callbackRef.current(), delay);

    return () => clearInterval(intervalID);
  }, [delay]);
};
