const useLocalStorage = (key, initialValue) => {
  // By default we don't want to initialize useState with the initialValue because ls might have some value
  const [val, setVal] = useState(() =>
    JSON.parse(localStorage.getItem(key) ?? initialValue)
  );

  // Using side effect to save val in LS when key or val updates
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val));
  }, [key, val]);

  return [val, setVal];
};
