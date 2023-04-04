process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
let items = require("./fakeDb");

let item = { name: "eggs", price: 5.00};

beforeEach(() => {
    items.push(item);
});

afterEach(() => {
    items.length = 0;
});

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ items: [item] });
    });
});

describe("POST /items", () => {
    test("Adding an item", async () => {
        newItem = { name: "cheese", price: "6.00" };
        const res = await request(app).post("/items").send(newItem);

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ added: { item: newItem }});
    });
    test("Responds w/ 400 if name or price is missing", async () => {
        newItem = { name: "celery" };
        const res = await request(app).post("/items").send(newItem);

        expect(res.statusCode).toBe(400);
    });
});

describe("GET /items/:name", () => {
    test("Viewing a single item", async () => {
        const res = await request(app).get(`/items/${item.name}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item });
    });
    test("Responds w/ 404 if name is invalid", async () => {
        const res = await request(app).get("/items/bananas");

        expect(res.statusCode).toBe(404);
    });
});

describe("PATCH /items/:name", () => {
    test("Editing an item", async () => {
        updatedItem = { name: "Egg Whites", price: 5.00 };
        const res = await request(app).patch(`/items/${item.name}`).send(updatedItem);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ updated: { item: updatedItem } });
    });
    test("Responds w/ 404 if name is invalid", async () => {
        updatedItem = { name: "Egg Whites", price: 5.00 };
        const res = await request(app).patch("/items/avocado").send(updatedItem);

        expect(res.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", () => {
    test("Deleting an item", async () => {
        const res = await request(app).delete(`/items/${item.name}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted" });
    });
    test("Responds w/ 404 if name is invalid", async () => {
        const res = await request(app).delete("/items/pineapple");

        expect(res.statusCode).toBe(404);
    });
});
