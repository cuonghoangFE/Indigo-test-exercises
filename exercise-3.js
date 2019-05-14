const discount_range = 100;
const discount_amount = 5;
const user_id_list = {
    1: 0.3,
    2: 0.1,
    3: 0.05,
    4: 0
}

const category_list_discount = {
    1: 0,
    2: 1,
    3: 1,
    4: 1
}

function NetPayableAmount() {
    this.userId = 0;
    this.bills = {};
    this.discountPayBill = {};
}

NetPayableAmount.prototype.setUser = function(user_id) {
    if (user_id_list.hasOwnProperty(user_id)) {
        this.userId = user_id;
    }
    
    return 'no user_id found';
}

NetPayableAmount.prototype.setBills = function(bills) {
    this.bills = bills;
}

NetPayableAmount.prototype.getDiscountItemBill = function() {
    const promotedCategoriesList = Object.keys(category_list_discount).filter(catId => category_list_discount[catId] === 1);

    for (key in this.bills) {
        let payAmountToPromo = 0;
        let subTotal = 0;
        const listItem = this.bills[key].items;
        const filterListItemPromo = listItem.filter(item => promotedCategoriesList.includes(item.cat_id.toString()));

        listItem.map(item => {
            subTotal += item.cost * item.qty;
        });

        filterListItemPromo.map(item => {
            payAmountToPromo += item.cost * item.qty;
        });

        this.discountPayBill[key] = { subTotal, payAmountToPromo };
        this._payableDiscountUtils();

        return this.discountPayBill;
    }
}

NetPayableAmount.prototype._payableDiscountUtils = function() {
    for (key in this.discountPayBill) {
        const subTotal = this.discountPayBill[key].subTotal;
        const payAmountToPromo = this.discountPayBill[key].payAmountToPromo;
        let discount = 0;

        if (this.userId === 4) {
            discount += Math.floor(payAmountToPromo / discount_range) * discount_amount;
        } else {
            discount += payAmountToPromo * (1 - user_id_list[this.userId]);
        }
        
        this.discountPayBill[key] = {
            ...this.discountPayBill[key],
            discount,
            total: subTotal - discount
        };
    }
}

module.exports = NetPayableAmount;