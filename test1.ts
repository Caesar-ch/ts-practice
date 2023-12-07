    interface Array<T> {
        myReduce: Function
    }

    Array.prototype.myReduce = function (num, callback: Function) {
        callback()
        return num
    }


    let sfns = function () {
        console.log('123');

    }
    console.log([1, 2, 3].myReduce(1, sfns));

    console.log([1, 2, 3].myReduce(1, 2));