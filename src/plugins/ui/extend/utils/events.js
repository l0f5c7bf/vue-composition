import Vue from 'vue'
const eventBus = new Vue()

export const updateTable = (params, uid = 0) => {
    console.log(111,uid);
    eventBus.$emit(`table.${uid}.update`, params);
    console.log(111,eventBus);

}

export default eventBus