import { INCREASE } from './action_types.js'

export const increaseCreator = function(n) {
    return {
        type: INCREASE,
        value: n
    }
}