function createWallet(initMoney) {
    var my_money = initMoney;
    return {
        add: function(num) {
            my_money += num;
        },
        deduct: function(num) {
            my_money -= (num >= 10 ? 10 : num);
        },
        getMoney() {
            return my_money;
        }
    }
}
var wallet = createWallet(99);
wallet.add(1);
wallet.deduct(100);
console.log(wallet.getMoney())