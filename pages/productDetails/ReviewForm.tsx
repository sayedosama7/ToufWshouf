import { useState, useEffect } from 'react';
import { useAddReviewMutation } from '@/store/Products/AddReviewApi';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import Rating from '@mui/material/Rating';
import Loading from '@/components/Loading/Loading';

const ReviewForm = ({ code, programyear }: { code: number; programyear: number }) => {
    const [review, setReview] = useState('');
    const [rate, setRate] = useState<number>(0);
    const [addReview, { isLoading, isSuccess, isError }] = useAddReviewMutation();

    const handleSubmit = async () => {
        const custCode = localStorage.getItem('custcode');
        const name = localStorage.getItem('NAME');

        if (!custCode || !name) {
            console.error('User not logged in or missing information');
            return;
        }

        try {
            const custId = Number(custCode);

            if (isNaN(custId)) {
                console.error('Invalid custCode');
                return;
            }

            await addReview({ code, programyear, cust: custId, rate, review }).unwrap();

            setReview('');
            setRate(0);
        } catch (error) {
            console.error('Failed to submit review:', error);
        }
    };

    return (
        <Box sx={{ my: 3 }}>
            <TextField
                id="outlined-basic"
                placeholder="Write your feedback here.."
                variant="outlined"
                fullWidth
                multiline
                maxRows={5}
                minRows={4}
                value={review}
                onChange={e => setReview(e.target.value)}
            />

            <Box sx={{ my: 2 }}>
                <Typography variant="h6">Rate this program</Typography>
                <Rating
                    name="rating"
                    value={rate}
                    onChange={(event, newValue) => setRate(newValue || 0)}
                />
            </Box>

            {isLoading && <Loading />}
            {isSuccess && (
                <Typography variant="body2" color="success.main">
                    Review submitted successfully!
                </Typography>
            )}
            {isError && (
                <Typography variant="body2" color="error.main">
                    Failed to submit review.
                </Typography>
            )}

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: 2, color: 'body.main' }}
            >
                <Button variant="contained" size="large" onClick={handleSubmit}>
                    Submit
                </Button>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="body1">Share via</Typography>
                    <IconButton>
                        <FacebookOutlinedIcon sx={{ color: 'body.main' }} />
                    </IconButton>
                    <IconButton>
                        <TwitterIcon sx={{ color: 'body.main' }} />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    );
};

export default ReviewForm;
