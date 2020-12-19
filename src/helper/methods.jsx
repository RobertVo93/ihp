import moment from "moment";

export const randomUUID = () => {
	return (
		Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1) +
		Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1)
	);
};

export const subtaskTicket = () => {
	return (
		"#" +
		Math.floor((1 + Math.random()) * 0x1000)
			.toString(16)
			.substring(1) +
		Math.floor((1 + Math.random()) * 0x1000)
			.toString(16)
			.substring(1)
	);
};

export const dateFormat = date => {
	return moment(date).format("MMMM Do, h:mm a");
};

export const onlyDate = date => {
	return moment(date).format("MMM Do");
};

export const datesWithYear = date => {
	return moment(date).format("MMM Do YYYY");
};

/**
 * Get Display value of selected key in option list like formConfig.options
 * @param {*} key 
 * @param {*} options 
 */
export const getDisplayValueOfSelectedKey = (key, options) => {
	let result = '';
	if (key && options && options.length > 0) {
		let selectedOption = options.filter((val) => {
			return parseInt(val.key) === parseInt(key);
		});
		if (selectedOption.length > 0) {
			result = selectedOption[0].value;
		}
	}
	return result;
};

/**
 * Remove dupplicate element in array, just keep the unique element
 * @param {*} array 
 */
export const arrayUnique = (array) => {
	if (!array) return [];
	var a = array.concat();
	for (var i = 0; i < a.length; ++i) {
		for (var j = i + 1; j < a.length; ++j) {
			if (a[i] === a[j])
				a.splice(j--, 1);
		}
	}

	return a;
}

/**
 * Convert blob (like logo_url in MySQL to object-file or image)
 * @param {*} binary 
 * @param {*} mime 
 */
export const blobToObject = (binary, mime) => {
	const data = new Uint8Array(binary);
	return new Blob([data], { type: mime });
}

/**
 * Create URL from blob
 * @param {*} binary 
 * @param {*} mime 
 */
export const blobToObjectURL = (binary, mime) => {
	const data = blobToObject(binary, mime);
	return URL.createObjectURL(data);
}