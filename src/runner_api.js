// In production runner api always will be available at /api at the same domain as game.
// In dev - vite proxing requests to runner(see vite.config.js).
const API_URL = "https://217.154.193.204/api"

class UnsuccessfulResponseError extends Error {
    constructor(response) {
        super(`Unsuccessful response: ${response.status}`)
        this.response = response
    }
}
class MethodCallError extends Error {
    constructor(error) {
        super(error.message || "call unsucessful")
        this.details = error.details
    }
}

async function rpcCall(method, params) {
    const resp = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            id: window.crypto.randomUUID(),
            jsonrpc: "2.0",
            method,
            params
        })
    })
    console.log(resp)

    if (resp.status !== 200) {
        throw new UnsuccessfulResponseError(resp)
    }
    const respBody = await resp.json()
    if (respBody.error) {
        throw new MethodCallError(respBody.error)
    }

    return respBody.result
}

const API = {
    async init(token) {
        return await rpcCall("init", { token })
    },

    async info(token) {
        return await rpcCall("info", { token })
    },

    async play(token, req) {
        return await rpcCall("play", { req, token })
    }
}

export { API }