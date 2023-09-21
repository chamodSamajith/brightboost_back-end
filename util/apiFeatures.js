class APIFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	filter() {
		// Create a shallow copy of query object
		const queryObject = { ...this.queryString };

		// The special parameters needs to be excluded from the filter
		const excludeFields = ['page', 'sort', 'limit', 'fields'];

		// Remove excluded query parameters from the query object
		excludeFields.forEach((el) => delete queryObject[el]);

		// Convert query object in to String
		let queryString = JSON.stringify(queryObject);

		// Replace the gte, gt, lte, le words with $gte, $gt, $lte, $lt
		queryString = queryString.replace(
			/\b(gte|gt|lte|lt)\b/g,
			(match) => `$${match}`
		);

		// Build the query
		this.query = this.query.find(JSON.parse(queryString));

		return this;
	}

	sort() {
		if (this.queryString.fields) {
			const sortBy = req.query.sort.split(',').join(' ');
			this.query = this.query.select(sortBy);
		} else {
			this.query.sort('-avgRating');
		}

		return this;
	}

	limitFields() {
		if (this.queryString.fields) {
			const fields = req.query.fields.split(',').join(' ');
			this.query = this.query.select(fields);
		} else {
			this.query = this.query.select('-__v');
		}

		return this;
	}

	paginate() {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 10;
		const skip = (page - 1) * limit;

		this.query = this.query.skip(skip).limit(limit);

		return this;
	}
}

module.exports = APIFeatures;
