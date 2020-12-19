export const numberFormat = number => {
	return number ? Number(number).toLocaleString("en") : 0;
};

export const moneyFormat = number => {
	return number
		? number.toLocaleString("en", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		})
		: 0;
};
