/* eslint-disable no-unused-vars */

import { reactive, ref } from "vue"
export const PiniaHistoryPlugin = ({ pinia, app, store, options }) => {

    //opt in plugin functionality, store must provide history enabled option

    if (!options.historyEnabled) return;

    const history = reactive([])
    const futureState = reactive([])
    history.push(JSON.stringify(store.$state))

    const doingUndo = ref(false)

    store.$subscribe((mutation, state) => {
        if (!doingUndo.value) {
            history.push(JSON.stringify(state))
            futureState.splice(0, futureState.length)
        }

    });

    return {
        //makes this visible in dev tool 
        // history,
        // futureState,
        redo: () => {
            const latestItems = futureState.pop()

            if (!latestItems) {
                return
            }

            doingUndo.value = true
            store.$state = JSON.parse(latestItems);
            doingUndo.value = false
        },
        undo: () => {
            {
                if (history.length === 1) return;
                doingUndo.value = true
                futureState.push(history.pop())
                store.$state = JSON.parse(history.at(-1));
                doingUndo.value = false
            }

        }
    }

}