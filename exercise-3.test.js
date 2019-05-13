const expect = require('expect');
const NetPayableAmount = require('./exercise-3');

const bills = {
    0: {
        price: 35,
        items: [
            {
                id: 1,
                cat_id: 1,
                cost: 10,
                qty: 2
            }, {
                id: 104,
                cat_id: 4,
                cost: 15,
                qty: 1
            }
        ]
    }
}

describe('print bill with net payable amount', () => {
    it('should 30% discount when user_id === 1', () => {
        const expected = {
            '0': {
                payableBeforeDiscount: 35,
                payAmountToPromo: 15,
                discount: 10.5,
                netPayable: 24.5
            }
        }
        const payable = new NetPayableAmount();

        payable.getUser(1);
        payable.getBills(bills);
        payable.getDiscountItemBill();

        expect(payable.discountPayBill).toEqual(expected)
    })

    it('should discount pay on $100 step when user_id === 4', () => {
        const expected = {
            '0': {
                payableBeforeDiscount: 35,
                payAmountToPromo: 15,
                discount: 0,
                netPayable: 35
            }
        }
        const payable = new NetPayableAmount();

        payable.getUser(4);
        payable.getBills(bills);
        payable.getDiscountItemBill();

        expect(payable.discountPayBill).toEqual(expected)
    })

    it('should return user_id not in db when user_id === 5', () => {
        const payable = new NetPayableAmount();

        const handler = payable.getUser(5);

        expect(handler).toEqual('no user_id found')
    })
});