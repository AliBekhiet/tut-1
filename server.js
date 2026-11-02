import express from 'express';
const app = express();

const listings = [
    {id: 1,title: "Nile View apartment", pricepernight:85 },
    {id: 2,title: "Beach House", pricepernight:140 },
    {id: 3,title: "Desert Eco-Lodge", pricepernight:60 },
];
function getListings() {
    return listings;
}
function getListingById(id) {
    return listings.find(listing => listing.id === id);
}
function addListing(listing) {
    const listing ={
        id= nextId++,
        title:data.title,
        pricepernight:data.pricepernight
    

    };
    listings.push(listing);
    return listing;
}
function updateListing(id, data) {
    const listing = getListingById(id);
    if (listing) {
        listing.title = data.title;
        listing.pricepernight = data.pricepernight;
    }
    function removeListing(id) {
    const index = listings.findIndex(listing => listing.id === id);

    if (index !== -1) {
        return listings.splice(index, 1)[0];
    }

    return null;
}

import express from 'express';
const app = express();

app.use(express.json());

const listings = [
    { id: 1, title: "Nile View apartment", pricepernight: 85 },
    { id: 2, title: "Beach House", pricepernight: 140 },
    { id: 3, title: "Desert Eco-Lodge", pricepernight: 60 },
];

let nextId = 4;

// GET: Get all listings
function getListings() {
    return listings;
}

// GET: Get listing by ID
function getListingById(id) {
    return listings.find(listing => listing.id === id);
}

// POST: Add a new listing
function addListing(data) {
    const listing = {
        id: nextId++,
        title: data.title,
        pricepernight: data.pricePerNight
    };

    listings.push(listing);
    return listing;
}

// PUT: Update a listing
function updateListing(id, data) {
    const listing = getListingById(id);

    if (listing) {
        listing.title = data.title;
        listing.pricepernight = data.pricePerNight;
        return listing;
    }

    return null;
}

// DELETE: Remove a listing
function removeListing(id) {
    const index = listings.findIndex(listing => listing.id === id);

    if (index !== -1) {
        return listings.splice(index, 1)[0];
    }

    return null;
}

// POST Handler
function handleCreate(req, res) {
    const data = req.body || {};

    if (!data.title || !data.pricePerNight) {
        return res.status(400).json({
            error: "title and pricePerNight are required"
        });
    }

    res.status(201).json(addListing(data));
}

// PUT Handler
function handleUpdate(req, res) {
    const data = req.body || {};

    if (!data.title || !data.pricePerNight) {
        return res.status(400).json({
            error: "title and pricePerNight are required"
        });
    }

    const listing = updateListing(Number(req.params.id), data);

    if (!listing) {
        return res.status(404).json({
            error: "Listing not found"
        });
    }

    res.json(listing);
}

// DELETE Handler
function handleDelete(req, res) {
    const listing = removeListing(Number(req.params.id));

    if (!listing) {
        return res.status(404).json({
            error: "Listing not found"
        });
    }

    res.status(204).end();
}

// Routes
app.get('/listings', (req, res) => {
    res.json(getListings());
});

app.get('/listings/:id', (req, res) => {
    const listing = getListingById(Number(req.params.id));

    if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
    }

    res.json(listing);
});

app.post('/listings', handleCreate);
app.put('/listings/:id', handleUpdate);
app.delete('/listings/:id', handleDelete);

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
