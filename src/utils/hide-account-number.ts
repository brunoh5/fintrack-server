export function hideAccountNumber(number: string) {
	const accountNumber = number.replace(/\s/g, '')
	return accountNumber.replace(
		/(\d{4})(\d{4})(\d{4})(\d{4})/g,
		'**** **** **** $4',
	)
}
