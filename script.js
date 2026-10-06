let products = [
    {
        id:1,
        name: "Laptop",
        price: 800,
        stock: 5,
        status: "Available"
    },
    { 
        id:2,
        name: "Mouse",
        price: 25,
        stock: 10,
        status: "Available"
    },
    {
        id:3,
        name: "Keyboard",
        price: 50,
        stock: 0,
        status: "Out of Stock"
    },
    {
        id:4,
        name: "Monitor",
        price: 300,
        stock: 2,
        status: "Available"
    },
    {
        id:5,
        name: "Headphones",
        price: 120,
        stock: 7,
        status: "Available"
    }
];
let eidthId=null;
const table=document.querySelector("tbody")
const searchitem=document.getElementById("search-input")
const searchbtn=document.getElementById("searchbtn")
const btn2=document.querySelector(".btn2")
const popup=document.querySelector(".popup-contenner")
const xpopup=document.querySelector(".fa-x")


function renderproduct() {
    table.innerHTML=""
products.forEach((item)=>{
    let td=document.createElement("tr")
    td.classList.add("product-row")
    td.innerHTML=`

            <td><input type="checkbox" name="checkbox" id="checkbox inverse"></td>

            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.stock}</td>
            <td>${item.status}</td>
            <td>
              <i class="fa-solid fa-trash-can" data-id="${item.id}"></i>
              <i class="fa-solid fa-pencil" data-id="${item.id}"></i>
            </td>
            
    `
table.appendChild(td)
td.classList.add("show")
})
    
}
    searchitem.addEventListener('input',(e)=>{
const value=e.target.value.toLowerCase()

let filterproduct=products.filter(item=>{
   
  return item.name.toLowerCase().includes(value)
    
})
table.innerHTML=""

filterproduct.forEach((item2)=>{
     let createtr=document.createElement("tr")
     createtr.classList.add("product-row")
createtr.innerHTML = `
            <td><input type="checkbox" name="checkbox" id="checkbox inverse"></td>
            <td>${item2.name}</td>
            <td>${item2.price}</td>
            <td>${item2.stock}</td>
            <td>${item2.status}</td>
            <td>
              <i class="fa-solid fa-trash-can"></i>
              <i class="fa-solid fa-pencil"></i>
            </td>

`
table.appendChild(createtr)

createtr.classList.add("show")
})
console.log(filterproduct);


})

 btn2.addEventListener("click",(e)=>{
 popup.classList.add("showme")

})


xpopup.addEventListener("click",()=>{
popup.classList.remove("showme")
})
const form=document.querySelector(".popup-text")
const subment=document.querySelector(".btn3")
// ////////////////////////////////////////////////
// form submition
// ///////////////////////////////////////////////

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);
    const getdata = Object.fromEntries(formdata);

    getdata.price = Number(getdata.price);
    getdata.stock = Number(getdata.stock);

    if (eidthId === null) {

        // ADD
        products.push(getdata);

    } else {

        // EDIT
        const product = products.find(item => item.id === eidthId);

        product.name = getdata.name;
        product.price = getdata.price;
        product.stock = getdata.stock;
        product.status = getdata.status;

        eidthId = null;
    }

    renderproduct();
    form.reset()
});
   
 table.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-pencil")) {
        const productId = Number(e.target.dataset.id);
        const producted=products.find(item=> item.id === productId)
        eidthId = productId
        document.querySelector("#name").value=producted.name;
        document.querySelector("#price").value=producted.price;
        document.querySelector("#stock").value=producted.stock;
        document.querySelector("#available").value=producted.status;
        popup.classList.add("showme")
        subment.value="save as"
        
        console.log(producted);
    }
    
});
    renderproduct()
table.addEventListener("click", (e) => {

    if (e.target.classList.contains("fa-trash-can")) {

        const productId = Number(e.target.dataset.id);

        products = products.filter(item => item.id !== productId);

        renderproduct();
    }

});

