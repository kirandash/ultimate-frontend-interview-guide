const useFetch = (url) => {
  const [responseJSON, setResponseJSON] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let shouldAbort = false;
    const fetchCall = async () => {
      // Since the fetch call will be made when url updates we need to set is loading as true again
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        if (shouldAbort) return;
        setResponseJSON(json);
        // REMEMBER TO RESET Error
        setError(null);
      } catch (error) {
        if (shouldAbort) return;
        setError(error);
        // REMEMBER TO RESET ResponseJSON
        setResponseJSON(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Invoke fetch call
    fetchCall();

    // Should abort or cancel the fetch call on unmount and stop setState actions in fetch call above
    return () => (shouldAbort = true);
  }, [url]);

  return {
    responseJSON,
    isLoading,
    error,
  };
};
