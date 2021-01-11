import request from '../plugins/axios'
import { tryGetOnlyArray } from '../plugins/ui/extend/utils'
export const fetchSecurityIntentionMobileBlacklistGetBlacklistTypes = (params) => {
    const url = '/security/intentionMobileBlacklist/getBlacklistTypes'
    return request({
        params,
        url
    })
}

export const fetchPhoneBlacklist = (params) => {
    const url = '/security/intentionMobileBlacklist/list'
    return request({
        params,
        url
    }).then(response => {
        return tryGetOnlyArray(response)
    })
}

export const fetchDelPhoneBlackList = (params) => {
    const url = '/security/intentionMobileBlacklist/deleteMobile'
    return request({
        params,
        url
    })
}