import Vue from 'vue'
import Vuex from 'vuex'
import { uuid, saveStatePlugin } from './utils'
import defaultBoards from './default-boards'

Vue.use(Vuex)

const boards = JSON.parse(localStorage.getItem('boards')) || defaultBoards

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    boards
  },
  mutations: {
    MOVE_TASK (state, { sourceList, targetList, from, to }) {
      const taskToMove = sourceList.splice(from, 1)[0]
      targetList.splice(to, 0, taskToMove)
    },
    MOVE_COLUMN (state, { from, to, columnList }) {
      const columnToMove = columnList.splice(from, 1)[0]
      columnList.splice(to, 0, columnToMove)
    },
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    UPDATE_TASK (state, { task, key, value }) {
      Vue.set(task, key, value)
    },
    UPDATE_COLUMN_NAME (state, { column, name }) {
      column.name = name
    },
    CREATE_NEW_COLUMN (state, { board, name }) {
      board.columns.push({
        name,
        tasks: []
      })
    },
    REMOVE_COLUMN (state, { columnIndex, board }) {
      board.columns.splice(columnIndex, 1)
    },
    REMOVE_TASK (state, { index, tasksList }) {
      tasksList.splice(index, 1)
    }
  },
  actions: {

  }
})
