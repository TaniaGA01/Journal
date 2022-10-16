// Les getters amennent l'info du state et on peut la proceser (pas modifier)

export const getEntriesByTerm = ( state ) => ( term = '' ) => {
 
    if (term.length === 0) return state.entries
    return state.entries.filter(entry => entry.text.toLowerCase().includes(term.toLocaleLowerCase()))
}

export const getEntriesById = ( state ) => (id = '') => {
    const entry = state.entries.find(entry => entry.id === id)
    if (!entry) return
    return {...entry} // {...entry} : pour destructurer l'entrée. Il permet de modifier l'entrée dans le view EntryView.vue sans modifier le composant EntryList.vue dans le front. Si on laise seulement 'return entry' la view et le composant seront modifiés au même temps
}