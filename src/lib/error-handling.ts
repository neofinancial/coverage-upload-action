const throwError = (error: unknown, message?:string) => {
    if(error instanceof Error){
        throw new Error(`Error: ${message}`)
    }
    throw new Error(`Error: unknown error`)
}

export default throwError