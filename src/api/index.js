import http from '@/service/http.js'
export const apiNodeRank = (options) => {
  return http.get('nodeRank', options)
}
export const apiNodeSum = (options) => {
  return http.get('nodeSum', options)
}
export const apiNodeRankPc = (options) => {
  return http.get('nodeRankPc', options)
}
export const apiNodeTypeSumNum = (options) => {
  return http.get('nodeTypeSumNum', options)
}
