const express = require("express");
const router = new express.Router();
const ExpressError = require("./expressError");
const items = require("./fakeDb");

router.get("/", (req, res) => {
    return res.json({ items });
});

router.post("/", (req, res, next) => {
    try {
        if (!req.body.name || !req.body.price) throw new ExpressError("Name and price are required.", 400);

        const newItem = { name: req.body.name, price: req.body.price };
        items.push(newItem);

        return res.status(201).json({ added: { item: newItem } });
    } catch (e) {

        return next(e);
    };
});

router.get("/:name", (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    if (item === undefined) {
        throw new ExpressError("Item not found", 404);
    }

    return res.json({ item });
});

router.patch("/:name", (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    if (item === undefined) {
        throw new ExpressError("Item not found", 404);
    };
    item.name = req.body.name;
    item.price = req.body.price;

    return res.json({ updated: { item } });
});

router.delete("/:name", (req, res) => {
    const itemIndex = items.findIndex(item => item.name === req.params.name);
    if (itemIndex === -1) {
        throw new ExpressError("Item not found", 404);
    };
    items.splice(itemIndex, 1);
    
    return res.json({ message: "Deleted"});
});

module.exports = router;
