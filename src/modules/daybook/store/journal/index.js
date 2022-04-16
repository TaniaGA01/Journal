// Cet index a tout l'info qu'on va transmettre dans le store

import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const journalModule = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}
export default journalModule