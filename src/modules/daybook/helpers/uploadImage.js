import axios from "axios"

const uploadImage = async (file) => {

    if (!file) return
    
    try {

        const formData = new FormData()
        formData.append('upload_preset', 'journal-vue')
        formData.append('file', file)

        const url = 'https://api.cloudinary.com/v1_1/dv0hvoqgt/image/upload'
        const { data } = await axios.post(url, formData)

        console.log('data', data)

        return data.secure_url
        
    } catch (error) {
        console.error('Erreur au moment de uploader l\'image')
        return null
    }

}

export default uploadImage