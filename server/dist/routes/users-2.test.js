"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPostRequest = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
async function sendPostRequest(body) {
    const WEBHOOK_URL = 'http://localhost:7777/api/users';
    const response = await (0, node_fetch_1.default)(WEBHOOK_URL, {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
    });
    return response.json();
}
exports.sendPostRequest = sendPostRequest;
jest.mock("node-fetch");
test("sendPostRequest makes request with correct parameters and returns expected response", async () => {
    node_fetch_1.default.mockReturnValue(Promise.resolve({
        json: () => Promise.resolve({
            id: 1,
            name: 'Admin',
            email: 'admin@admin.com',
            token: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
        }),
    }));
    const response = await sendPostRequest({
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'password123'
    });
    expect(node_fetch_1.default).toHaveBeenCalledTimes(1);
    expect(node_fetch_1.default).toHaveBeenLastCalledWith("http://localhost:7777/api/users", {
        body: '{"name": "Admin", "email": "admin@admin.com", "password": "password123"}',
        headers: { "Content-Type": "application/json" },
        method: "post",
    });
    expect(response).toEqual({
        id: 1,
        name: 'Admin',
        email: 'admin@admin.com',
        token: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    });
});
