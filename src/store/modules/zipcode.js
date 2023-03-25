import {API_KEY} from "@/api";

export default {
    state: {
        zipcodes: [],
    },

    mutations: {
        PUSH_ZIPS_TO_STATE(state, obj) {
            this.state.zipcode.zipcodes.push(obj)
        },
        PUSH_QUERIES_TO_STATE(state, obj) {
            this.state.zipcode.zipcodes = obj
        },

        REMOVE_ZIP_FROM_STATE(state, obj) {
            this.state.zipcode.zipcodes = this.state.zipcode.zipcodes.filter(item => item.postal_code !== obj)
        }
    },

    actions: {
        async GET_ZIPS_FROM_API({commit}, zip) {
            try {
                const res = await fetch(`https://app.zipcodebase.com/api/v1/search?apikey=${API_KEY}&codes=${zip}&country=us`)
                const getZips = await res.json()
                const zipObj = []
                Object.values(getZips.results).forEach(el => {

                    el.forEach(el => {
                        zipObj.city = el.city,
                        zipObj.country_code = el.country_code,
                        zipObj.postal_code = el.postal_code,
                        zipObj.state = el.state,
                        zipObj.state_code = el.state_code
                    })
                })

                if (zipObj.city == null || zipObj.country_code == null) {
                    return
                }

                commit('PUSH_ZIPS_TO_STATE', zipObj)
            } catch(e) {
                console.log(e)
            }
        },

        async GET_QUERIES_FROM_API({commit}, zip) {
            try {
                const res = await fetch(`https://app.zipcodebase.com/api/v1/search?apikey=${API_KEY}&codes=${zip}&country=us`)
                const getZips = await res.json()
                const zipObj = []

                Object.values(getZips.results).forEach((el) => {
                    zipObj.push(el[0])
                })
                commit('PUSH_QUERIES_TO_STATE', zipObj)
            } catch(e) {
                console.log(e)
            }
        },

        REMOVE_ZIP_CODE({commit}, zip) {
            commit('REMOVE_ZIP_FROM_STATE', zip)
        },
    },

    getters: {
        ZIP_LIST(state) {
            const key="postal_code"
            let uniqueObjArray = [
                ...new Map(state.zipcodes.map((item) => [item[key], item])).values(),
            ];
            return uniqueObjArray
        },
        QUERIES_LIST(state, getters) {
            return getters.ZIP_LIST.map(el => el.postal_code)
        }
    },
}