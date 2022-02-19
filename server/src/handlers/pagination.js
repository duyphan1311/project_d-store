exports.pagination = (list, limitItem) => {
    async (req, res) => {
        const page = parseInt(req.query.page)
        const limit = limitItem

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

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
        try {
            results.results = await list.slice(startIndex, endIndex)
            return results
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}