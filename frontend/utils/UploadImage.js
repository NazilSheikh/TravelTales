// import axios from "axios";

// const UploadImage = async(imageFile) =>{
//     const formData = new FormData();
//     formData.append('image' , imageFile)
//     try
//     {
//         const response =  await axios.post('http://localhost:3000/api/users/upload-image', {

//             headers:{

//                  'Content-Type' : 'multipart/form-data '  ,  // Set Header for file upload 
//             } ,
//         }) ;
//         return response.data ;

//     }catch(error)
//     {
//         console.error("Error Uploading the file " , error);
//         throw error ;
//     }
// }

// export default UploadImage ;


import axios from "axios";

const UploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await axios.post("http://localhost:3000/api/users/upload-image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,  // Ensure token is present
            },
        });
        console.log("the image upload data : " , response.data);
        return response.data;
    } catch (error) {
        console.error("Error Uploading the file", error);
        throw error;
    }
};

export default UploadImage;
