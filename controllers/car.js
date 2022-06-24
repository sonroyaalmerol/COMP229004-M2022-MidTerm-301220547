/**
 * 
 * File name: car.js
 * Author's name: Son Roy Almerol
 * Student ID: 301220547
 * Project Name: COMP 229 Midterm
 * 
 */

// create a reference to the model
let CarModel = require('../models/car');

// Gets all cars from the Database and renders the page to list them all.
module.exports.carList = function(req, res, next) {  
    CarModel.find((err, carsList) => {
        //console.log(carList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('cars/list', {
                title: 'Cars List', 
                CarsList: carsList,
                userName: req.user ? req.user.username : ''
            })            
        }
    });
}


// Gets a car by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    CarModel.findById(id, (err, carToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('cars/details', {
                title: 'Car Details', 
                car: carToShow
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
         
    res.render('cars/add_edit', {
        title: 'Add Car',
        car: {
            make: null,
            model: null,
            year: null,
            kilometers: null,
            doors: null,
            seats: null,
            color: null,
            price: null
        }
    })
}

// Processes the data submitted from the Add form to create a new car
module.exports.processAddPage = async (req, res, next) => {
    const data = { ...req.body }
    delete data.id

    await CarModel.create(data)
    
    res.redirect('/cars/list')
}

// Gets a car by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = async (req, res, next) => {
    
    const id = req.params.id

    const car = await CarModel.findById(id).lean().exec()

    res.render('cars/add_edit', {
        title: 'Edit Car',
        car
    })
}

// Processes the data submitted from the Edit form to update a car
module.exports.processEditPage = async (req, res, next) => {
    const data = { ...req.body }
    delete data.id

    await CarModel.findByIdAndUpdate(req.body.id, data).exec()
    
    res.redirect('/cars/list')
}

// Deletes a car based on its id.
module.exports.performDelete = async (req, res, next) => {
    const id = req.params.id

    await CarModel.remove({ _id: id }).exec()

    res.redirect('/cars/list')
}