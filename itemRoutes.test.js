process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
let items = require("./fakeDb");

let item = { name: "eggs", price: "4.00"};

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
})
