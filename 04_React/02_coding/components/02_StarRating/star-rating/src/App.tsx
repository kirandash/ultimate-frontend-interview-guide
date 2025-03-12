import { useState } from "react";
import StarRating from "./components/StarRating";

function App() {
  const [currRating1, setCurrRating1] = useState(2);
  const [currRating2, setCurrRating2] = useState(0);
  const [currRating3, setCurrRating3] = useState(7);
  return (
    <>
      <StarRating
        maxStars={5}
        currStars={currRating1}
        onChange={(newRating) => setCurrRating1(newRating)}
      />
      <StarRating
        maxStars={6}
        currStars={currRating2}
        onChange={(newRating) => setCurrRating2(newRating)}
      />
      <StarRating
        maxStars={10}
        currStars={currRating3}
        onChange={(newRating) => setCurrRating3(newRating)}
      />
    </>
  );
}

export default App;
