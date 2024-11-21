const axios = require('axios');
const Joi = require('joi');

const BASE_URL = "http://localhost:5000";

const productSchema = Joi.object({
    product_name: Joi.string(),
    product_qty: Joi.number(),
    product_descr: Joi.string(),
})

describe("API Endpoints", () => {
    const username = "testuser";
    const password = "testpassword";
    const products = {
        pens: "ASAPP%20Pens",
        sticker: "ASAPP%20Stickers",
        bottles: "ASAPP%20Bottles"
    }

    test("User  Registration", async () => {
        const payload = {
            username: username,
            password: password
        };
        const response = await axios.post(`${BASE_URL}/users/register`, payload);
        expect(response.status).toBe(200); 
    });

    test("User  Registration Fail", async () => {
        const payload = {
            username: username,
            password: password
        };
        try {
            await axios.post(`${BASE_URL}/users/register`, payload);
            
        } catch (error) {
            expect(error.response.status).toBe(409); 
            
        }
    });

    test("User  Login", async () => {
        const payload = {
            username: username,
            password: password
        };
        const response = await axios.post(`${BASE_URL}/users/login`, payload);
        expect(response.status).toBe(200); 
    });
    
    test("Add Product to Cart", async () => {
        const payload = {
            quantity: 2
        };
        const response = await axios.post(`${BASE_URL}/${username}/products/${products.pens}/add`, payload);
        expect(response.status).toBe(200);
    });

    test("Checkout Cart", async () => {
        const response = await axios.post(`${BASE_URL}/${username}/products/cart/checkout`);
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

    test("User  Logout", async () => {
        const payload = {
            username: username
        };
        const response = await axios.post(`${BASE_URL}/users/logout`, payload);
        expect(response.status).toBe(200);
    });
});