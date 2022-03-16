exports.pagination = async (list, page, limitItem) => {
    const limit = limitItem
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    results.totalPage = Math.ceil(list.length / limit)

    if (endIndex < await list.length) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }
    if (page > 0 && page <= results.totalPage) {
        results.results = await list.slice(startIndex, endIndex)
        return results
    }
    else {
        return false
    }
}