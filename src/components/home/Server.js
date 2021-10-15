const ApiUrl = "https://mercatodoapi.herokuapp.com/api/products/"



export const listProducts = async () => {
    return await fetch(ApiUrl);
};
export const listProducts2 = async () => {
    return await fetch(ApiUrl);
};

export const getProduct = async (productId) => {
    return await fetch(`${ApiUrl}${productId}`);
};

export const addProduct = async (newProduct) => {
    return await fetch(ApiUrl, {
        method: "POST",
        headers: {
            'content-Type' : 'application/json'
        },
        body: JSON.stringify({
            "prod_description": String(newProduct.prod_description).trim(), 
            "prod_unit_price": parseInt(newProduct.prod_unit_price),
            "prod_stock": parseInt(newProduct.prod_stock),
        })
    });
};
export const update = async (productId, update) => {
    return await fetch(`${ApiUrl}${productId}`, {
        method: "PUT",
        headers: {
            'content-Type' : 'application/json'
        },
        body: JSON.stringify({
            "prod_description": String(update.prod_description).trim(), 
            "prod_unit_price": parseInt(update.prod_unit_price),
            "prod_stock": parseInt(update.prod_stock),
        })
    });
};

export const deletProduct = async (productId) => {
    return await fetch(`${ApiUrl}${productId}`, {
        method: "DELETE",
    });
};