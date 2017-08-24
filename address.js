(function () {
    let vm = new Vue({
        el: "#address-container",
        data: {
            addressList: [],
            addressListLimitedNumber: 3,
            expandAddressFlag: false,
            selectedIndex: -1,
            defaultIndex: -1,
            shippingMethodIndex: 0
        },
        mounted: function () {
            this.$nextTick(() => {
                this.initAddressList();
            });
        },
        computed: {
            limitedAddressList: function () {
                return this.addressList.slice(0, this.addressListLimitedNumber);
            }
        },
        methods: {
            initAddressList: function () {
                axios.get("./data/address.json")
                    .then((response) => {
                        this.addressList = response.data.result;
                        for (let index in this.addressList) { //根据json设置初始的默认地址
                            if (this.addressList[index].isDefault) {
                                this.defaultIndex = index;
                                break;
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            expandAddress: function () {
                this.expandAddressFlag = !this.expandAddressFlag;
                this.addressListLimitedNumber = this.expandAddressFlag ? this.addressList.length : 3;
            }
        }
    });
})();