export interface Product {
    rate_review: number;
    code: number;
    programyear: number;
    programname: string;
    rating: number ;
    startprice?: number;
    img_path: string;
    offerPrice?: number | null;
}
