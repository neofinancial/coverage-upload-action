const throwError = (error: unknown, message?:string): void => {
    if(error instanceof Error){
        throw new TypeError(`Error: ${message}`)
    }
    
    throw new TypeError(`Error: unknown error`)
}

export default throwError