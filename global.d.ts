export type TableData={
    id:number,
    name:string,
    email:string,
    gender:string,
    status:string
}
export type UserPosts={
    id:number,
    user_id:number,
    title:string,
    body:string
}
export type UserHistory={
    id:number,
    name:string,
    status:string,
    gender:string
}
export type Pagination={
    pages:number,
    page:number
}