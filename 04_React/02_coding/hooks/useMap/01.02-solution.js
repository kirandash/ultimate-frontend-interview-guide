const useMap = (initialvalue) => {
  const [map, setMap] = useState(new Map(initialvalue));

  // custom set fn for the map
  // we are using callback to make sure the fn is static and does not change between renders
  const set = useCallback((key, value) => {
    // set map and make sure react re-renders
    setMap((prevMap) => {
      // Setting only a value for a key won't change the entire map.
      // So, we are making a new map every time so that react will know that the entire map is updates and it will cause the re-render
      const newMap = new Map(prevMap);
      newMap.set(key, value);
      return newMap;
    });
    // Note that we are not using any dependency for prevMap but using callback with setMap because we want the useCallback fn to be static and does not change between renders
  }, []);

  // custom delete fn for the map
  // delete is a reserved keyword. so use something else
  const del = useCallback((key) => {
    setMap((prevMap) => {
      // create a clone for proper rerender
      const newMap = new Map(prevMap);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  // custom clear fn for the map
  const clear = useCallback(() => {
    setMap((prevMap) => {
      // create a clone for proper rerender
      // No need to do .clear() as we can just return an empty map
      const newMap = new Map();
      return newMap;
    });
  }, []);

  // We should not return map and all the fns directly from useMap because they are just fns and they will update the map itself but there is no way for react to know that the fn is called and map is updated hence we need to create custom wrapper fns around the native map and map fns so that react knows about the updates and re-renders properly
  return {
    map,
    set,
    delete: del,
    clear,
  };
};
