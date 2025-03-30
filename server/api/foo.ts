export default defineEventHandler((event) => {
    const method = event.method;
    return "Hello from the server!" + method;
})