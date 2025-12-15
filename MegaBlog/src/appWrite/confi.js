import conf from "../conf/conf";
import { Client, ID,Databases,Storage,Query } from "appwrite";

export class DatabaseService{
    client=new Client();
    Databases;
    Storage;
    constructor(){
        this.client
        .setEndpoint(conf.appWrite_url) // Your Appwrite Endpoint
        .setProject(conf.appWrite_project_id); // Your project ID
        this.Databases=new Databases(this.client);
        this.Storage=new Storage(this.client);
    }   
    
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.Databases.createDocument(
                conf.appWrite_database_id,
                conf.appWrite_collection_id,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userid: userId  // Appwrite schema requires lowercase "userid"
                }
            );
            
        } catch (error) {
            console.log("appwrite service :: createPost :: error",error);
            throw error;
        }
}
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.Databases.updateDocument(
                conf.appWrite_database_id,
                conf.appWrite_collection_id,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
            
        } catch (error) {
            console.log("appwrite service :: updatePost :: error",error);
            
        }
}
    async deletePost(slug){
        try {
            return await this.Databases.deleteDocument(
                conf.appWrite_database_id,
                conf.appWrite_collection_id,
                slug
            );
            
        } catch (error) {
            console.log("appwrite service :: deletePost :: error",error);
            
        }
    }
    async getPostBySlug(slug){
        try {
            return await this.Databases.getDocument(
                conf.appWrite_database_id,
                conf.appWrite_collection_id,
                slug
            );
            
        } catch (error) {
            console.log("appwrite service :: getPostBySlug :: error",error);
            throw error;
        }
    }
    async getPost(slug){
        // Alias for getPostBySlug for convenience
        return this.getPostBySlug(slug);
    }
    async getPosts(queries=[Query.equal("status","active")]){
        try {
            // Check if user is authenticated by trying to get current session
            // If not authenticated, return empty result without making API call
            const res=await this.Databases.listDocuments(
                conf.appWrite_database_id,
                conf.appWrite_collection_id,
                queries
            );
            return res;
            
        } catch (error) {
            // Handle 401 Unauthorized errors gracefully
            if(error.code === 401 || 
               error.type === 'general_unauthorized_scope' ||
               error.message?.includes('Unauthorized') ||
               error.message?.includes('not authorized')){
                // User is not authenticated, return empty result
                return { documents: [] };
            }
            // For other errors, log and return empty result
            console.log("appwrite service :: getPosts :: error",error);
            return { documents: [] };
        }

    }       

    //file upload services
    async uploadFile(file){
        try {
            return await this.Storage.createFile(
                conf.appWrite_bucket_id,
                ID.unique(),
                file
            );
            
        } catch (error) {
            console.log("appwrite service :: uploadFile :: error",error);
            
        }
    }
    /**
     * Get file preview URL from Appwrite Storage
     * Returns null on failure - NEVER returns empty string
     * @param {string} fileId - Appwrite file ID
     * @returns {string|null} - Valid URL string or null
     */
    getFilePreview(fileId){
        try {
            // Return null if no fileId (not empty string)
            if (!fileId || typeof fileId !== 'string' || fileId.trim() === '') {
                return null;
            }
            
            // Validate bucket ID exists
            if (!conf.appWrite_bucket_id) {
                console.error("❌ getFilePreview: Bucket ID not configured");
                return null;
            }
            
            // getFilePreview returns a URL object, need to access .href property
            const previewUrl = this.Storage.getFilePreview(
                conf.appWrite_bucket_id,
                fileId,
                400,
                400
            );
            
            // Handle both URL object and string return types
            const imageUrl = previewUrl?.href || previewUrl || null;
            
            // Validate URL is not empty string
            if (!imageUrl || imageUrl.trim() === '') {
                return null;
            }
            
            return imageUrl;
            
        } catch (error) {
            console.error("❌ getFilePreview - Error:", error);
            return null;
        }
    }
    
    /**
     * Get file view URL for public files (no authentication required)
     * Returns null on failure - NEVER returns empty string
     * @param {string} fileId - Appwrite file ID
     * @returns {string|null} - Valid URL string or null
     */
    getFileView(fileId){
        try {
            // Return null if no fileId (not empty string)
            if (!fileId || typeof fileId !== 'string' || fileId.trim() === '') {
                return null;
            }
            
            // Validate bucket ID exists
            if (!conf.appWrite_bucket_id) {
                console.error("❌ getFileView: Bucket ID not configured");
                return null;
            }
            
            // getFileView returns a URL string for public files
            const viewUrl = this.Storage.getFileView(
                conf.appWrite_bucket_id,
                fileId
            );
            
            // Handle both URL object and string return types
            const imageUrl = viewUrl?.href || viewUrl || null;
            
            // Validate URL is not empty string
            if (!imageUrl || imageUrl.trim() === '') {
                return null;
            }
            
            return imageUrl;
            
        } catch (error) {
            console.error("❌ getFileView - Error:", error);
            return null;
        }
    }
    async getFileDownload(fileId){
        try {
            return this.Storage.getFileDownload(
                conf.appWrite_bucket_id,
                fileId
            );
            
        } catch (error) {
            console.log("appwrite service :: getFileDownload :: error",error);
            
        }
    }
    async deleteFile(fileId){
        try {
            return await this.Storage.deleteFile(
                conf.appWrite_bucket_id,
                fileId
            );
            
        } catch (error) {
            console.log("appwrite service :: deleteFile :: error",error);
            
        }
    }
}

const service=new DatabaseService();
export default service;