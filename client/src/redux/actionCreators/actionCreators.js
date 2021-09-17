import { UPD_CARD } from "../actionTypes/actionType"

export const updCardAC = (payload) => {
  return {
    type: UPD_CARD,
    payload
  }
}
