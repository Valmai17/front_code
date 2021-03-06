define(function(require) {
	return {
		  string: require('./string'),
		  method: require('./method'),
		  number: require('./number'),
		  boolean: require('./boolean'),
		  regexp: require('./regexp'),
		  integer: require('./integer'),
		  float: require('./float'),
		  array: require('./array'),
		  object: require('./object'),
		  enum: require('./enum'),
		  pattern: require('./pattern'),
		  card: require('./type'),
		  tel: require('./type'),
		  phone: require('./type'),
		  positiveInteger: require('./type'),
		  email: require('./type'),
		  url: require('./type'),
		  date: require('./date'),
		  hex: require('./type'),
		  required: require('./required')
	}
});