import transactions from '@/store/modules/database/mutations/transactions';
import accounts from '@/store/modules/database/mutations/accounts';
export default {
    ...transactions,
    ...accounts,
}