const request = async (path, options = null) => {
  const url = `http://127.0.0.1:5000${path}`;
  const response = await fetch(url, options);
  return response.json();
};

export const getMerchandise =() =>{
    return request("/merchandise",{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
});
}

export const postMerchandise=(merchandise)=>{
    return("/merchandise",{
        method:"POST",
        headers:{
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(merchandise),
    });
};

export const getSales = () => {
  return request("/sales", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const postSales = (salesData) => {
  return request("/sales", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(salesData),
  });
};

export const getMonthlySales = () => {
  return request("/sales/monthly", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteSale = (saleId) => {
  return fetch(`/sales/${saleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const postProduct = (product) => {
  return request("/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
};
