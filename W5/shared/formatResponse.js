function formatBodyErrorsResponse(errors) {
    return errors.array().map(err => {
        return { message: `${err.msg} in ${err.param}` }
    });
}

module.exports = {
    formatBodyErrorsResponse,
}