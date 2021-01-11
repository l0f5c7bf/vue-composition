import tryGetOnlyArray from './try-get-only-array'
import tryGetPaginationParams from './try-get-pagination-params'

export default (data) => {
    const onlyArray = tryGetOnlyArray(data)
    const paginationParams = tryGetPaginationParams(data)
    if (onlyArray.error || paginationParams.error) {
        return {
            data: [],
            error: true,
        }
    } else {
        return {
            data: onlyArray.data,
            total: paginationParams.total,
            error: false
        }
    }

}