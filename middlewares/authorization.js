const authorization = async (req, res, next) => {
    try {
        const { role } = req.whoAmI
        if(role == 'admin') {
            next()
        } else {
            throw new Error('Unauthorized')
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authorization