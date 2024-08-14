import { createSlice } from "@reduxjs/toolkit";
// import { ProductType } from "../Types/productType";



interface CartItem {
    // product:ProductType
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
    // product:ProductType
    quantity: number;
}
interface UserCart {
    user: string;
    cart: CartItem[]
    total: number;
}
interface InitialStateType {
    cartList: UserCart[];
    cartCount: number;
    total:number;
}
const InitialState: InitialStateType = {
    cartList: [],
    cartCount: 0,
    total:0
}

const cartSlice = createSlice({
    name: "cart",
    initialState: InitialState,
    reducers: {
        addTocart: (state, action) => {
            const { user, product } = action.payload
            const userCart = state.cartList.find((cart) => cart.user === user)

            if (userCart) {
                const existingProduct = userCart.cart.find((item) => item.id === product.id)
                if (existingProduct) {
                    existingProduct.quantity += 1
                } else {
                    userCart.cart.push({ ...product, quantity: 1 })
                }

            } else {
                state.cartList.push({
                    user,
                    cart: [{ ...product, quantity: 1 }],
                    total: product.price
                })
            }

            if (userCart) {
                userCart.total = userCart.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            }
        },
        incrementQuantity: (state, action) => {
            const { user, productId } = action.payload;
            
            const userCart = state.cartList.find((cart) => cart.user === user);
            
            if (userCart) {
                const product = userCart.cart.find((item) => item.id === productId)
                if (product) {
                    product.quantity += 1;
                    state.cartCount += 1;
                    userCart.total = userCart.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                }
            }

        },
        decrementQuantity: (state, action) => {
            const { user, productId } = action.payload;
            const userCart = state.cartList.find((cart) => cart.user === user);
            if (userCart) {
                const product = userCart.cart.find((item) => item.id === productId)
                if (product && product.quantity > 1) {
                    product.quantity -= 1;
                    state.cartCount -= 1;
                    userCart.total = userCart.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

                }
            }
        },
        removeFromCart: (state, action) => {
            const { user, productId } = action.payload;
            const userCart = state.cartList.find((cart) => cart.user === user);
            if (userCart) {
                const product = userCart.cart.find((item) => item.id === productId)
                if (product) {
                    userCart.cart = userCart.cart.filter((item) => item.id !== productId)
                    state.cartCount -= product.quantity
                    userCart.total = userCart.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                
                }
            }
        }
    }
})

export const { addTocart, incrementQuantity,decrementQuantity,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer