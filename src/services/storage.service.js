const imageKit =require("@imagekit/nodejs")
const imagekit = new imageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
})
async function uploadFile(buffer){
       const result = await imagekit.files.upload({
        file:buffer.toString("base64"),
        fileName:Date.now().toString()
       });
       return result;
}
module.exports = uploadFile;