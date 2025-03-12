import { useState } from "react";
import Star from "./Star";

type Props = {
  maxStars: number;
  currStars: number;
  onChange: (newStarsRating: number) => void;
};

// Pseudocode
// Use maxStars to generate the list of stars to be displayed
// If currStars is defined if currStars is >= the current non zero index then fill the star
// Hover index should be initialized with null and not zero because our star rating system allows for null selection as well
// If user hovers over a star, set the hover index and if the hover index exists then fill the stars till the hover index
// If user hovers away reset hover index back to null and if hover index does not exist then filled state should be decided by currStars only
// on clicking a star we want to update the currStars - to do this call the onchange method and pass the nonzeroIdx to the onchange method and then in parent component create a state to update currStars when onChange is invoked
const StarRating = ({ maxStars, currStars, onChange }: Props) => {
  // Hover index should be initialized with null and not zero because our star rating system allows for null selection as well
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  return (
    <div>
      {Array.from({ length: maxStars }).map((_, idx) => {
        // since star rating is not zero based, let's create a non zero idx
        const nonZeroIdx = idx + 1;
        return (
          <span
            onMouseEnter={() => setHoverIdx(nonZeroIdx)}
            onMouseLeave={() => setHoverIdx(null)}
            onClick={() => onChange(nonZeroIdx)}
          >
            <Star
              filled={
                hoverIdx ? nonZeroIdx <= hoverIdx : nonZeroIdx <= currStars
              }
            />
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
