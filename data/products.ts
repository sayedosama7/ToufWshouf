export interface Product {
    code: number;
    programname: string;
    rating: number;
    startprice?: number;
    img_path: string;
    offerPrice?: number | null;
}
