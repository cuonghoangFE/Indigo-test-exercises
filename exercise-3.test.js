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

describe('Write a program with test cases such that given a bill, it finds the net payable amount.', () => {
    it('should 30% discount when user_id === 1', () => {
        const expected = {
            '0': {
                subTotal: 35,
                payAmountToPromo: 15,
                discount: 10.5,
                total: 24.5
            }
        }
        const payable = new NetPayableAmount();

        payable.setUser(1);
        payable.setBills(bills);
        const handler = payable.getDiscountItemBill();

        expect(handler).toEqual(expected)
    })

    it('when userType === 4 it should discount 5$ for every $100', () => {
        const expected = {
            '0': {
                subTotal: 35,
                payAmountToPromo: 15,
                discount: 0,
                total: 35
            }
        }
        const payable = new NetPayableAmount();

        payable.setUser(4);
        payable.setBills(bills);
        const handler = payable.getDiscountItemBill();

        expect(handler).toEqual(expected)
    })

    it('should return user_id not found when user_id === 5', () => {
        const payable = new NetPayableAmount();

        const handler = payable.setUser(5);

        expect(handler).toEqual('no user_id found')
    })
});