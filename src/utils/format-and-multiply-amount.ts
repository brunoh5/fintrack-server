export function formatAndMultiplyAmount(amount: string) {
	const amountInNumber = amount.replace('R$', '').trim().replace(',', '.')

	const multiplied = parseFloat(amountInNumber) * 100

	return multiplied
}
