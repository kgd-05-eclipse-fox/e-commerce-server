module.exports = errors => {
    const err = []
    errors.forEach( error => {
        err.push(error.message)
    })
    return err
}