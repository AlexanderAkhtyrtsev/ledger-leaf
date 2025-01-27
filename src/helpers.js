import store from '@/store'

export function formatCurrency(value, currency = 'USD') {
    const converted = store.getters.calculateRateToFavourite( currency ) * value;
    const fav = store.getters['database/favouriteCurrency']

    return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        maximumFractionDigits: 2,
    }).format(converted) + ' ' + fav + (fav === currency ? '' : '*');
}