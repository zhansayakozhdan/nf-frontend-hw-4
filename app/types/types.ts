export interface IProduct {
    id: number,
    title: string,
    description: string,
    category: string,
    price: number,
    rating?: {
        count: number,
        rate: number
    }
    image: string
}

export interface FileImage {
    originalname: string,
    filename: string,
    location: string
}