let vm = new Vue({
    el: "#cart",
    data: {
        productList: [], //商品列表
        checkedAllFlag: false, //是否全选
        totalPrice: 0, //合计金额
        deleteFlag: false, //控制删除确认框的弹出
        deleteItem: null //待删除的商品
    },
    filters: {
        formatMoney: function (price) {
            return "￥ " + price.toFixed(2) + " 元"; //Number.prototype.toFixed返回一个控制了小数点后小数位数的经过四舍五入后的数值的字符串表示形式
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.init();
        });
    },
    methods: {
        init() {
            axios.get("./data/cartData.json") //用json文件模拟数据库返回的json数据
                .then((response) => {
                    this.productList = response.data.result.list;
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        changeGoodsQuantity(item, method) {
            item.productQuantity += method;
            if (item.productQuantity < 1) {
                item.productQuantity = 1;
            }
            this.calTotalPrice();
        },
        setChecked(item) {
            if (typeof item.checkedFlag == "undefined") {
                this.$set(item, "checkedFlag", true);
            } else {
                item.checkedFlag = !item.checkedFlag;
            }
            this.calTotalPrice();
        },
        setCheckedAll() {
            this.checkedAllFlag = !this.checkedAllFlag;
            this.productList.forEach((item) => {
                if (typeof item.checkedFlag == "undefined") {
                    this.$set(item, "checkedFlag", true);
                } else {
                    item.checkedFlag = this.checkedAllFlag;
                }
            });
            this.calTotalPrice();
        },
        calTotalPrice() {
            let sum = 0;
            for (let item of this.productList) {
                if (item.checkedFlag && item.checkedFlag == true) {
                    sum += item.productQuantity * item.productPrice;
                }
            }
            this.totalPrice = sum;
        },
        deleteProduct(item) {
            this.deleteFlag = true; //调出确认删除对话框
            this.deleteItem = item; //保存要删除的商品对象
        },
        cancelDel() {
            this.deleteFlag = false;
            this.deleteItem = null;
        },
        confirmDel() {
            this.deleteFlag = false;
            let deleteItemIndex = this.productList.indexOf(this.deleteItem);
            this.productList.splice(deleteItemIndex, 1);
            this.deleteItem = null;
            this.calTotalPrice();
        }
    }
});



