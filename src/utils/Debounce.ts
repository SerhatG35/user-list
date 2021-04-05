export const Debounce = (fnc: Function , delay:number) => {
    let timeout:any
    return () =>{
        if(timeout)clearTimeout(timeout)
        timeout = setTimeout(() => {
            fnc()
        }, delay);
    }
}
export const DebounceWithParameter = (fnc: Function, delay:number , parameter :number) => {
    let timeout:any
    return () =>{
        if(timeout)clearTimeout(timeout)
        timeout = setTimeout(() => {
            fnc(parameter)
        }, delay);
    }
}