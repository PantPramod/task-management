
const errorHandler = (err, req, res, next) => {
    const constants = {
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        NOT_FOUND: 404,
        FORBIDDEN: 403,
        SERVER_ERROR: 500
    }
    const statusCode = res.statusCode ? res.statusCode : 500

    switch (statusCode) {
        case constants.BAD_REQUEST:
            res.json({
                title: "Bad Request",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "Internal Server Error",
                message: err.message,
                stackTrace: err.stackTrace
            })
            break;
        default:
            // console.log(err)
            res.status(500).json({
                title: "Uncaught",
                message: err.message,
                stackTrace: err.stackTrace,
                status: res.statusCode
            })
            break;
    }
}

export default errorHandler