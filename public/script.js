//find element with the id details-btn/menu-btn
// let btn = document.getElementById('details-btn')
// let menuBtn = document.getElementById('menu-btn')
const deleteBtn = document.querySelector('#delete-btn')
console.log(deleteBtn);

//find element with the id list/menu
let list = document.getElementById('list')
let menuList = document.getElementById('menu')

// menuBtn.addEventListener('click', async () => {
//     const id = window.location.pathname.split('/restaurants/')
//     console.log(id)
//     //fetch the menu route from express
//     let res = await fetch('/menu/{$id[1]}')
//     //parse as json
//     let restaurant = await res.json()
//     //access Menus in respone
//     let menus = restaurant.Menus
//     console.log(menus)
//     //for each menu in the list, create a sublist
//     menuList.innerText = ""
//     for(m of menus){
//         //add a size 3 header for each menu
//         let menuLabel = document.createElement('h3')
//         menuLabel.innerText = m.title
//         menuList.append(menuLabel)
//         let menu = document.createElement('ul')
//         //for each menu item in that menu, create a list item
//         for(i of m.MenuItems){
//             let item = document.createElement('li')
//             item.innerText = `${i.name}: ${i.price}`
//             menu.append(item)
//         }
//         menuList.append(menu)
//     }

// })

//add event listener when this button is clicked
// btn.addEventListener('click', async () => {
//     //fetch the restaurant-data path from my express server
//     let res = await fetch('/restaurant-data');
//     //parse the response as json - just the data
//     let restaurantList = await res.json();
//     //console.log the data from the response
//     list.innerText = ""
//     for(item of restaurantList.restaurants){
//         console.log(item)
//     }
// });

deleteBtn.addEventListener('click', async () => {
    console.log('click');
    //get id from the current url path
    const id = window.location.pathname.split('/restaurants/')[1]
    //fetch the menu route from express for this id
    let res = await fetch(`/restaurants/${id}`, {
        method: 'DELETE',
    })
    console.log(res)
    window.location.assign('/restaurants')
});