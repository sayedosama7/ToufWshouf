import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import Rating from '@mui/material/Rating';
import React, { FunctionComponent } from 'react';

interface Props {
    rating: number | string;
    readOnly?: boolean;
}

const ProductRating: FunctionComponent<Props> = props => {
    const [valueRating, setValueRating] = React.useState<number | null>(2);

    const ratingValue = typeof props.rating === 'string' ? parseFloat(props.rating) : props.rating;
    const { readOnly } = props;

    return (
        <Rating
            name="half-rating-read"
            defaultValue={2}
            precision={0.5}
            value={ratingValue}
            onChange={(event, newValue) => {
                setValueRating(newValue);
            }}
            readOnly={readOnly ? true : false}
            sx={{
                '& .MuiRating-iconFilled': {
                    color: 'primary.main',
                },
                '& .MuiRating-iconEmpty': {
                    color: 'primary.main',
                },
                zIndex: '12',
            }}
            icon={<StarRoundedIcon fontSize="inherit" />}
            emptyIcon={<StarOutlineRoundedIcon fontSize="inherit" />}
        />
    );
};

export default ProductRating;
