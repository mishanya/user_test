const {logger} = process;

module.exports = (res, code, message, log) => {

	if (code >= 500) {
		logger.log('warn', log);
	}

	return res.json({
		status: {
			code,
			message
		}
	})
}