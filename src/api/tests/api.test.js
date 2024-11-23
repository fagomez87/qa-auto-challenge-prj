const axios = require('axios');
const Joi = require('joi');

const BASE_URL = "http://localhost:5000";

const productSchema = Joi.object({
    product_name: Joi.string(),
    product_qty: Joi.number(),
    product_descr: Joi.string(),
})

const getCartSchema = Joi.object({
    product_name: Joi.string(),
    product_qty: Joi.number(),
    cart_owner: Joi.string()
})

const CHECKOUT = "Checkout successful! Thank you for shopping with us."
const REGISTERED = "User created successfully"
const REGISTER_FAIL = "Username \"user\" already exists"
const ADD_TO_CART = "QTY \"2\" of product \"ASAPP Pens\" added to cart"
const DELETED = "Product \"ASAPP Pens\" removed from cart."

describe("API Endpoints", () => {
    const username = `testuser_${Math.random().toString(36).substring(2, 10)}`;
    const password = Math.random().toString(36).substring(2, 12) + '!' + Math.floor(Math.random() * 100);;
    const products = {
        pens: "ASAPP%20Pens",
        sticker: "ASAPP%20Stickers",
        bottles: "ASAPP%20Bottle"
    }

    test("User Registration", async () => {
        const payload = {
            username: username,
            password: password
        };
        const response = await axios.post(`${BASE_URL}/users/register`, payload);
        expect(response.status).toBe(200);
        expect(response.data).toBe(REGISTERED)
    });

    test("User Registration Fail", async () => {
        const payload = {
            username: username,
            password: password
        };
        try {
            await axios.post(`${BASE_URL}/users/register`, payload);
            
        } catch (error) {
            expect(error.response.status).toBe(409);
            const message = REGISTER_FAIL.replace("user",username)
            expect(error.response.data).toBe(message)
            
        }
    });

    test("User Login", async () => {
        const payload = {
            username: username,
            password: password
        };
        const response = await axios.post(`${BASE_URL}/users/login`, payload);
        expect(response.status).toBe(200); 
    });

    test("Get all products", async () => {
        const response = await axios.get(`${BASE_URL}/${username}/products`)
        expect(response.status).toBe(200);
        
        response.data.forEach(product => {
            const { error } = productSchema.validate(product)

            // Ensure there is no validation error
            expect(error).toBeUndefined(); 
        })
       
    })
   
    test("Get specific products", async () => {
        const response = await axios.get(`${BASE_URL}/${username}/products/${products.sticker}`)
        expect(response.status).toBe(200);
        const { error } = productSchema.validate(response.data)

        // Ensure there is no validation error
        expect(error).toBeUndefined(); 
       
    })
    
    test("Add Product to Cart", async () => {
        const payload = {
            quantity: 2
        };
        const response = await axios.post(`${BASE_URL}/${username}/products/${products.pens}/add`, payload);
        expect(response.status).toBe(200);
        expect(response.data).toBe(ADD_TO_CART)

    });

    test("Get cart info", async () => {
        const response = await axios.get(`${BASE_URL}/${username}/products/cart`);
        expect(response.status).toBe(200);

        const { error } = getCartSchema.validate(response.data[0])
        // Ensure there is no validation error
        expect(error).toBeUndefined();
    });

    test("Checkout Cart", async () => {
        const response = await axios.post(`${BASE_URL}/${username}/products/cart/checkout`);
        expect(response.status).toBe(200);
        expect(response.data).toBe(CHECKOUT)
    });

    test("Add products to delete", async () => {
        const payload = {
            quantity: 2
        };

        const response = await axios.post(`${BASE_URL}/${username}/products/${products.pens}/add`, payload);
        expect(response.status).toBe(200);
    });

    test("Delete from cart", async () => {
        const payload = {
            quantity: 2
        };
        
        const response = await axios.post(`${BASE_URL}/${username}/products/cart/${products.pens}/remove`, payload);
        expect(response.status).toBe(200);
        expect(response.data).toBe(DELETED)     
    })

    test("User Logout", async () => {
        const payload = {
            username: username
        };
        const response = await axios.post(`${BASE_URL}/users/logout`, payload);
        expect(response.status).toBe(200);
    });
});