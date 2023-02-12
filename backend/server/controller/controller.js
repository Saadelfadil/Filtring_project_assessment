let filterDB = require("../model/model")

// Create a filter to Database

exports.create = (req, res) => {
    if (!req.body)
    {
        res.status(400).send({message: "The request should'nt be empty"});
        return;
    }
    console.log("Body : ", req.body);
    const filter = new filterDB({
        supplier: req.body.supplier,
        wholeSeller: req.body.wholeSeller,
        steeringType: req.body.steeringType,
        model: req.body.model,
        sfx: req.body.sfx,
        variant: req.body.variant,
        color: req.body.color,
        quantities: req.body.quantities
    });

    filter.save(filter).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({message: err.message || "Error when creating filter."})
    })
}

// Get a single or all filters from Database

exports.find = (req, res) => {
    
    if (req.query.id)
    {
        const id = req.query.id;
        
        filterDB.findById(id).then((data) => {
            if (!data)
            {
                res.status(404).send({message: `${id} not found in the database`})
            }
            else
                res.send(data);
        }).catch((err) => {
            res.status(500).send({message: err.message || "Error in getting the filter"});
        })
    }
    else if (req.query.supplier != undefined && req.query.wholeSeller != undefined && req.query.steeringType != undefined)
    {

        const supplier = req.query.supplier;
        const wholeSeller = req.query.wholeSeller;
        const steeringType = req.query.steeringType;

        filterDB.find({ $and: [
            {supplier: supplier}, {wholeSeller: wholeSeller}, {steeringType: steeringType}
        ] }).then((data) => {
            if (!data)
            {
                res.status(404).send({message: `${supplier} not found in the database`})
            }
            else
                res.send(data);
        }).catch((err) => {
            res.status(500).send({message: err.message || "Error in getting the filter"});
        });
    }
    else {

        filterDB.find().then((filter) => {
            res.send(filter);
        }).catch((err) => {
            res.status(500).send({message: err.message || "Error while getting filters"})
        })
    }
}

// Update filter from Database

exports.update = (req, res) => {

    console.log("ID : ", req.body)

    if(!req.body)
    {
        return res.status(400).send({message: "Error in updating the filter"})
    }

    const id = req.params.id;
    console.log("ID : ", id, " | ", req.body )
    filterDB.updateOne({"_id" : id},
    {$set: { "quantities" : req.body}}).then((data) => {
        if (!data)
        {
            res.status(400).send({message: `Error cannot update the filter ${id} ( filter not found ...)`})
        }
        else{
        res.send(`The filter with ID : ${id} updated succesfully`);
        console.log("data : ", data)}
    }).catch((err) => {
        res.status(500).send({message: err.message || "Error while updating filter"})
    })

    // filterDB.findByIdAndUpdate(id, {quantities: req.body}, { useFindAndModify: false}).then((data) => {
    //     if (!data)
    //     {
    //         res.status(400).send({message: `Error cannot update the filter ${id} ( filter not found ...)`})
    //     }
    //     else
    //         res.send(`The filter with ID : ${id} updated succesfully`);
    // }).catch((err) => {
    //     res.status(500).send({message: err.message || "Error while updating filter"})
    // })
}

// Delete filter from Database

exports.delete = (req, res) => {
    const id = req.params.id;

    filterDB.findByIdAndDelete(id).then((data) => {
        if (!data)
        {
            res.status(400).send({message: `Error cannot delete the filter ${id} ( filter not found ...)`})
        }
        else
            res.send(`The filter with ID : ${id} deleted succesfully`);
    }).catch((err) => {
        res.status(500).send({message: err.message || `Error while deleting the filter ${id}`});
    })
}