const User = require('../models/User');
const APIFeatures = require('../util/apiFeatures');

// Read all the document in user collection
exports.getAllUsers = async (req, res, next) => {
	try {
		// Execute the query
		const features = new APIFeatures(User.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		const users = await features.query;

		// Send response
		res.status(200).json({
			status: 'success',
			results: users.length,
			data: {
				users,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

/**
 * Read a specific document by id that passed as query parameter
 * in user collection
 */
exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				user,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

// Update a document by given id. This only for patch method
exports.updateUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			status: 'success',
			data: {
				user,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

// Delete a document by id
exports.deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};
