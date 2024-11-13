export const ok = (body: any) => ({
    status: 200, body
})

export const created = (body: any) => ({
    status: 201, body
})

export const badRequest = (message: string) => {
    return {
        statusCode: 400,
        body: message,
    }
}