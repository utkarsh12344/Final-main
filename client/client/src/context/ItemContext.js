//context/ItemContext.js

import {
	createContext,
	useEffect,
	useState
} from 'react';

const itemContext = createContext();

// creating custom provider
function CustomItemContext({ children }) {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [itemsInCart, setItemsInCart] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0)

	// useEffect to load all the vegetables
	useEffect(() => {
		// Fetch products from the backend and dispatch 'SET_PRODUCTS' action
		const fetchData = async () => {
			const response =
				await fetch('https://final-main-1.onrender.com/api/products');
			const products = await response.json();
			// console.log(products)
			setProducts(products);
		};

		fetchData();
	}, []);

	const addToCart = (product) => {
		// if(cart.length > 0){
		// 	cart.filter((item)=>{
		// 		if(product.name === item.name){

		// 	})
		// }
		setTotalPrice(totalPrice + product.price)
		setCart([...cart, product]);
		setItemsInCart(itemsInCart + 1);
		
	};

	const removeFromCart = (product) => {
		console.log(cart)
		const index =
			cart.findIndex(
				(prdt) =>
					prdt._id === product);


	
		if (index !== -1) {
			// Item found in the cart
			// Now you can remove it from the cart array
			const updatedCart = [...cart];
			updatedCart.splice(index, 1);
			setTotalPrice(totalPrice - cart[index].price);
			setCart(updatedCart);
			setItemsInCart(itemsInCart - 1);
		} else {
			console.log("Item not found in the cart");
		}
	};

	return (
		// default provider
		<itemContext.Provider value={
			{
				products, addToCart,
				removeFromCart,
				itemsInCart, totalPrice,
				cart
			}}>
			{children}
		</itemContext.Provider>
	);
}

export { itemContext };
export default CustomItemContext;
