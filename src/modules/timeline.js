import moment from "moment";

const CREATE_TIMELINE = 'CREATE_TIMELINE';
const EDIT_TIMELINE = 'EDIT_TIMELINE';
const CLEAR_TIMELINE = 'CLEAR_TIMELINE';
const EDIT_DOINGNOW = 'EDIT_DOINGNOW';

const initialState = {
  logs: [],
  doingNow: {memo:"", type:"", end_at: moment().format('hh:mm:ss')}
}

export const createTimeline = log => {
  return {
    type: CREATE_TIMELINE,
    payload: log
  }
}

export const editTimeline = log => {
  return {
    type: EDIT_TIMELINE,
    payload: log
  }
}

export const clearTimeline = () => {
  return {
    type: CLEAR_TIMELINE,
    payload: []
  }
}

export const editDoingNow = doingNow => {
  return {
    type: EDIT_DOINGNOW,
    payload: doingNow
  }
}

export function timelineReducer (state = initialState, action) {
  switch (action.type) {
    case CREATE_TIMELINE:
      const payloadIncludingId = { ...action.payload, id: state.logs.length };
      return Object.assign({}, state, {logs: [...state.logs, payloadIncludingId]});
    case EDIT_TIMELINE:
      const rejectedTargetLogs = state.logs.filter(log => log.id !== action.payload.id);
      const newLogs = [ ...rejectedTargetLogs, action.payload ].sort((a, b) => a.id - b.id);
      return Object.assign({}, state, {logs: newLogs});
    case CLEAR_TIMELINE:
      return Object.assign({}, state, {logs: action.payload});
    case EDIT_DOINGNOW:
      return Object.assign({}, state, {doingNow: action.payload});
    default:
      return state
  }
}