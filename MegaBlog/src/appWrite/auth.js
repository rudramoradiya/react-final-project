import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client=new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appWrite_url) // Your Appwrite Endpoint
        .setProject(conf.appWrite_project_id); // Your project ID
        this.account=new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{
        const userAccount=await this.account.create(ID.unique(), email, password, name);
        if(userAccount){
            //call another method
            return this.login({email, password});
        }
        else
            {
            return userAccount;
            }
        }
        catch(err){
            throw err;
        }
            
    }
    async login({email, password}){
        try{
            const userAccount=await this.account.createEmailPasswordSession(email, password); 
            return userAccount;
        }
        catch(err){
            throw err;
        }
    } 
    async getCurrentUser(){
        try{
            const userAccount=await this.account.get();
            return userAccount;
        }
        catch(err){
            // If user is not authenticated (401) or missing scopes, return null instead of throwing
            // Silently handle 401 errors to prevent console noise
            if(err.code === 401 || 
               err.type === 'general_unauthorized_scope' || 
               err.message?.includes('missing scopes') ||
               err.message?.includes('Unauthorized')){
                return null;
            }
            // For any other error, also return null to prevent app crashes
            return null;
        }
    }   
    async logout(){
        try{
            const res=await this.account.deleteSessions();
            return res;
        }
        catch(err){
            throw err;
        }
    }
}

const authService = new AuthService();



export default authService;