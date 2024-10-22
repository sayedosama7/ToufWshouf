import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import React, { FunctionComponent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { addToWishlist, removeFromWishlist, setWishlist } from '@/store/wishlistSlice';
import { Product } from '@/data/products';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';

interface Props {
    id: string;
    productData: Product;
}

const WishlistButton: FunctionComponent<Props> = ({ id, productData }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const wishlistItems = useAppSelector(state => state.wishlist.items);

    const isInWishlist = wishlistItems.some(item => item.code === productData.code);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
        dispatch(setWishlist(storedItems));
    }, [dispatch]);

    const handleToggleWishlist = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(productData.code));
            toast.error(t('trip removed from wish list') as string);
        } else {
            dispatch(addToWishlist(productData));
            toast.success(t('trip added to wish list') as string, {
                className: 'toast-orange',
                autoClose: 2000,

            });
        }
    };

    return (
        <Box
            sx={{
                borderRadius: '50%',
                backgroundColor: 'body.light',
                position: 'relative',
                right: '3px',
                top: '3px',
            }}
        >
            <Checkbox
                icon={<FavoriteBorderIcon color="primary" />}
                checkedIcon={<FavoriteIcon />}
                checked={isInWishlist}
                onChange={handleToggleWishlist}
            />
        </Box>
    );
};

export default WishlistButton;
