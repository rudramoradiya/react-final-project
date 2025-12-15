// cSpell:ignore APPWRITE
const conf={
    appWrite_url:String(import.meta.env.VITE_APPWRITE_URL),
    appWrite_project_id:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),   
    appWrite_database_id:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWrite_collection_id:String(import.meta.env.VITE_APPWRITE_TABLE_ID),
    appWrite_bucket_id:String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf;