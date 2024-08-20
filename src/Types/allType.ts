export interface ProductType {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
    rating: {
        rate: number;
        count: number;
    };
    quantity: number;
}

export interface UserCart {
    user: string;
    cart: CartItem[]
    total: number;
}
export interface orderDetailsType{
    user:string|null;
    products:CartItem[]
    address:string
    total:number
    status:string
    paymentType: string;  
    phone: number;
    date:string
    name:string
}

export interface UserOrder{
    user:string;
    order:orderDetailsType[]
}

export interface userDataType {
    email: string
    email_verified: boolean
    family_name: string
    given_name: string
    name: string
    nickname: string
    picture: string
    sub: string
    updated_at: string
}

export interface UserAuthState {
    userData: userDataType 
}

export interface adminDataType {
    aud: string
    azp: string
    email: string
    email_verified: string
    exp: number
    family_name:string
    given_name:string
    iat:number
    iss:string
    jti:string
    name:string
    nbf:number
    picture:string
    sub:string
}

export interface AdminAuthState {
    adminData: adminDataType|null;
}