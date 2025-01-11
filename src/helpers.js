
export function formatCurrency(value, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'decimal',
    }).format(value) + ' ' + currency;
}