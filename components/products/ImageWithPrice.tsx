import { Box } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Price from './Price';
import WishlistButton from './WishlistButton';
import { Stack } from '@mui/system';

interface Props {
    src: any;
    price: number;
    offerPrice: number | undefined;
    wishlist?: boolean;
}
const ImageWithPrice: FunctionComponent<Props> = ({ src, price, offerPrice, wishlist }) => {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                position: 'relative',
                borderRadius: '8px  0 0 8px !important',
                height: '100%',
            }}
        >
            <Image
                src={src}
                alt="product"
                style={{ zIndex: 0, borderRadius: '8px  0 0 8px !important' }}
                layout="fill"
                quality={100}
                placeholder="blur"
            />
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: '100%', p: 1 }}
            >
                <Price price={price} offerPrice={offerPrice} />
                {wishlist && <WishlistButton id={''} />}
            </Stack>
        </Box>
    );
};

export default ImageWithPrice;
