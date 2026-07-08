// Import ImageKit Node.js SDK module for cloud storage integrations
const imageKit =require("@imagekit/nodejs")
// Instantiate ImageKit client instance using config properties
const imagekit = new imageKit({
    // Retrieve standard public api key from process environment configuration
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    // Retrieve secret private key from process environment configuration
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    // Retrieve custom url domain endpoint from process environment configuration
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
})
// Define an asynchronous function wrapper helper handling storage uploading
async function uploadFile(buffer){
       // Trigger ImageKit file upload api call and await returning result object
       const result = await imagekit.files.upload({
        // Convert the local binary file buffer into base64 format content
        file:buffer.toString("base64"),
        // Assign a unique upload filename using current system microsecond timestamp
        fileName:Date.now().toString()
       });
       // Return successful cloud upload response parameters
       return result;
}
// Export helper file uploading function wrapper to controllers layer
module.exports = uploadFile;