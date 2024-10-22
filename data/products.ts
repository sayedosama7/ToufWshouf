export interface Product {
    id?: string;
    rate_review: number; 
    code: number;
    programyear: number;
    programname: string;
    rating: number; 
    startprice: number | undefined;
    img_path: string;
    offerPrice: number | null | undefined;
}