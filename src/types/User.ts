export interface User {
    id: number;
    firstName: string;
    lastName: string;
    profilePic?: string;
}

export interface UserSession extends User {
   email: string 
}