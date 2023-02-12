function addProducts(event){
    event.preventDefault()
    const price = document.getElementById('sellingprice').value
    const product = document.getElementById('product').value
    const productObj = {
        price, product
    }
    axios.post('https://crudcrud.com/api/0b51e89e0be24e3bb8eb0a868449eb1d/products',productObj)
    .then((response)=>{
        showProductsOnDisplay(response.data)
        totalPrice()
    })
    .catch(err=>document.body.innerHTML = `${err}`)
}

function showProductsOnDisplay(products){
    document.getElementById('sellingprice').value = ''
    document.getElementById('product').value = ''
    const parentNode = document.getElementById('listofproducts')
    const li = `<li id="${products._id}">${products.price} - ${products.product} <button class="btn btn-danger btn-sm" onclick="deleteProduct('${products._id}')">Delete Product</button></li>`
    parentNode.innerHTML += li;
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get('https://crudcrud.com/api/0b51e89e0be24e3bb8eb0a868449eb1d/products')
    .then((response)=>{
        for(let i=0; i<response.data.length; i++){
            let key = response.data[i]
            showProductsOnDisplay(key)
            totalPrice()
        }
    })
    .catch(err => document.body.innerHTML += `${err}`)
})
function deleteProduct(productId){
    // console.log(productId)
    axios.delete(`https://crudcrud.com/api/0b51e89e0be24e3bb8eb0a868449eb1d/products/${productId}`)
    .then((response)=>{
        deleteFromScreen(productId)
        totalPrice()
    })
    .catch((err)=>document.body.innerHTML += `${err}`)
}
function deleteFromScreen(productId){
    const parentNode = document.getElementById('listofproducts')
    const productToBeDeleted = document.getElementById(productId)
    if(productToBeDeleted){
        parentNode.removeChild(productToBeDeleted)
    }
}
function totalPrice(){
    axios.get('https://crudcrud.com/api/0b51e89e0be24e3bb8eb0a868449eb1d/products')
    .then((response)=>{
        let price = 0
        for(let i=0 ; i<response.data.length; i++){
            let a = Number(response.data[i].price);
            price += a;
        }
        document.getElementById('netvalue').innerHTML = `Total Value Worth of Products: ₹ ${price}`
    })
}