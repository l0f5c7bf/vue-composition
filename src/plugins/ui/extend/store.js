export const timestamp = 'ui.timestamp'
export const uid = 'ui.uid'
export const event = 'ui.event'
export const params = 'ui.params'


function common(component, state, _params) {
  let _uid = 0
  if (_params && _params._uid) {
    _uid = _params._uid
    delete _params._uid
  }

  state[component][timestamp] = +new Date()
  state[component][uid] = _uid
  state[component][params] = _params
}

const state = {
  table: {
    [timestamp]: +new Date(),
    [uid]: 0,
    [event]: 'update',
    [params]: undefined
  },
  dialog: {
    [timestamp]: +new Date(),
    [uid]: 0,
    [event]: 'open',
    [params]: undefined
  }
}

const mutations = {
  'ui.update.table'(state, _params) {
    common('table', state, _params)
    state.table[event] = 'update'
  },
  'ui.table.update'(state, _params) {
    common('table', state, _params)
    state.table[event] = 'update'
  },
  'ui.dialog.open'(state, _params) {
    common('dialog', state, _params)
    state.dialog[event] = 'open'
  },
  'ui.dialog.close'(state, _params) {
    common('dialog', state, _params)
    state.dialog[event] = 'close'
  }
}

export default {
  state,
  mutations
}
