import { StarOutlineRounded, StarRounded } from "@mui/icons-material";
import { Rating } from "@mui/material";
import React, { FunctionComponent } from "react";
interface Props {
  rating: number;
  readOnly?: boolean;
}
const ProductRating: FunctionComponent<Props> = (props) => {
  const [valueRating, setValueRating] = React.useState<number | null>(2);

  const { rating, readOnly } = props;

  return (
    <Rating
      name="half-rating-read"
      defaultValue={2}
      precision={0.5}
      value={rating}
      onChange={(event, newValue) => {
        setValueRating(newValue);
      }}
      readOnly={readOnly ? true : false}
      sx={{
        "& .MuiRating-iconFilled": {
          color: "primary.main",
        },
        "& .MuiRating-iconEmpty": {
          color: "primary.main",
        },
        zIndex: "12",
      }}
      icon={<StarRounded fontSize="inherit" />}
      emptyIcon={<StarOutlineRounded fontSize="inherit" />}
    />
  );
};

export default ProductRating;
