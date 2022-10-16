// Les actions appellent les mutations
// Pour qu'une Action change le State il faut passer par les Mutations

import journalAPI from "@/api/journalAPI"

export const loadEntries = async ({ commit }) => {
    const { data } = await journalAPI.get('/entries.json')

    const entries = []
    
    for (let id of Object.keys(data)) {// convertir data en un array d'objets
        entries.push({
            id,
            ...data[id]// toujour la destructuration
        })
    }

    commit('setEntries', entries) // les deux arguments viennent de la mutation
}


export const updateEntry = async ({ commit }, entry) => {
    
    const { date, picture, text } = entry
    const dataToSave = { date, picture, text }

    await journalAPI.put( `/entries/${entry.id}.json`, dataToSave )

    commit('updateEntry', {...entry}) // les deux arguments viennent de la mutation
    
}


export const createEntry = async ({ commit }, entry) => {
// export const createEntry = async (entry) => {
    
    const { date, picture, text } = entry
    
    const dataToSave = { date, picture, text }
    
    const { data } = await journalAPI.post(`/entries.json`, dataToSave)
    
    dataToSave.id = data.name
    
    commit('addEntry', dataToSave)// dataToSave a maintenant l'id

    return data.name
    
}
export const deleteEntry = async ( { commit }, id ) => {

    await journalAPI.delete( `/entries/${id}.json` )

    commit('deleteEntry', id) // les deux arguments viennent de la mutation

    return id
}