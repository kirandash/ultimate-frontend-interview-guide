const useLocalStorage = (key, initialValue) => {
  // By default we don't want to initialize useState with the initialValue because ls might have some value
  const [val, setVal] = useState(() => {
    // localStorage.getItem will return a string. So we should parse it using JSON.parse
    const existingValue = JSON.parse(localStorage.getItem(key));

    if (existingValue === null || existingValue === undefined) {
      // Make sure to stringify your data before setting into LS
      localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
    return existingValue;
  });

  const setValAndLocalStorage = (newVal) => {
    // save stringified val in LS
    localStorage.setItem(key, JSON.stringify(newVal));
    // save parsed val in state
    setVal(newVal);
  };

  return [val, setValAndLocalStorage];
};
