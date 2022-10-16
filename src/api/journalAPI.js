import axios from "axios";

const journalAPI = axios.create({
    baseURL:'https://journal-vuejs-893aa-default-rtdb.europe-west1.firebasedatabase.app'
})

export default journalAPI