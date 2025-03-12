// reducer fn that takes a state and action, data input and returns a new state
const reducer = (state, { actionType, responseJSON, error }) => {
  switch (actionType) {
    case "loading":
      return { ...state, isLoading: true };
    case "success":
      return { responseJSON, isLoading: false, error: null };
    case "error":
      return { responseJSON: null, isLoading: false, error };
    default:
      throw new Error("Unknown action type");
  }
};

const useFetch = (url) => {
  // const [responseJSON, setResponseJSON] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  const [state, dispatch] = useReducer(reducer, {
    responseJSON: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let shouldAbort = false;
    const fetchCall = async () => {
      // setIsLoading(true);
      dispatch({ actionType: "loading" });
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        if (shouldAbort) return;
        // setResponseJSON(json);
        // setError(null);
        dispatch({ actionType: "success", responseJSON: json });
      } catch (error) {
        if (shouldAbort) return;
        // setError(error);
        // setResponseJSON(null);
        dispatch({ actionType: "success", error });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCall();

    return () => (shouldAbort = true);
  }, [url]);

  // return {
  //   responseJSON,
  //   isLoading,
  //   error,
  // };
  return state;
};
