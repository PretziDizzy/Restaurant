const express = require("express");
const { check, validationResult } = require('express-validator');

//Handlebars
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

//Models
const Restaurant = require('./models/restaurant');
const Menu = require('./models/menu');
const MenuItem = require('./models/menuItem');


//db
const initialiseDb = require('./initialiseDb');
initialiseDb();

//port
const port = 3000;
const app = express();

//serve static files
app.use(express.static('public'));

//HB Configuration
const handlebars = expressHandlebars({
    handlebars : allowInsecurePrototypeAccess(Handlebars)
})
app.engine('handlebars', handlebars);
app.set('view engine', 'handlebars')

//allow express to read json request bodies
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const restaurantChecks = [
    check('name').not().isEmpty().trim().escape(),
    check('image').isURL(),
    check('name').isLength({ max: 50 })
]

app.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurant.findAll();
    console.log(restaurants);
    res.render("restaurants", {restaurants});
});

app.get('/restaurants/:id', async (req, res) => {
    const restaurants = await Restaurant.findAll();
    const restaurant = await Restaurant.findByPk(req.params.id, {include: {
            model: Menu,
            include: MenuItem
        }
    });
    res.render('restaurant',{restaurants, restaurant});
});

app.get('/restaurant-name/:name', async (req, res) => {
    const restaurant = await Restaurant.findOne(req.params.name, {include: {
            model: Menu,
            include: MenuItem
        }
    });
    res.render('restaurant',{restaurant});
});

app.get('/menu/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id, {include: {
    model:Menu,
    include: MenuItem
}
});
res.render(restaurant)
})


//New Routes for html-form
app.get ('/new-restaurant-form', async (req, res) => {
    res.render('newRestaurantForm')
}) 

app.post('/new-restaurant', async (req, res) => {    
const newRestaurant = await Restaurant.create(req.body)
console.log(newRestaurant);
let restaurantAlert1 = `${newRestaurant.name} added to your database`
const foundRestaurant = await Restaurant.findByPk(newRestaurant.id)
console.log(foundRestaurant);
if(foundRestaurant){
    res.render('newRestaurantForm', {restaurantAlert1})
} else {
    restaurantAlert2 = 'Failed to add Restaurant'
    res.render('newRestaurantForm', {restaurantAlert2})
}
})

app.post('/restaurants', restaurantChecks, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    await Restaurant.create(req.body);
    res.sendStatus(201);
});

app.delete('/restaurants/:id', async (req, res) => {
    const deleteRestaurant = await Restaurant.destroy({
        where: {id:req.params.id}
    })
    console.log(deleteRestaurant);
    // const Restaurant = await Restaurant.findAll()
    // res.render('restaurant', {deleteRestaurant})
    //use boolen return value from destroy method return to generate a string message
    res.send(deleteRestaurant ? "Deleted Restaurant" : "Deleted Failed");
    
});

app.put('/restaurants/:id', restaurantChecks, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    const restaurant = await Restaurant.findByPk(req.params.id);
    await restaurant.update(req.body);
    res.sendStatus(200);
});

app.patch('/restaurants/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    await restaurant.update(req.body);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});