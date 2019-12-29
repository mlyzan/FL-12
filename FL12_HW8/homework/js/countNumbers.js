function countNumbers(arg){
    let obj = {};
    let str = arg.split('');
    let newArr = str.filter(e => !isNaN(e)).sort((a,b) => a-b);
    newArr.filter(e => {
        Object.keys(obj).includes(e) ? obj[e]++ : obj[e] = 1;
        return false
    });
    return obj;
}
console.log(countNumbers('erer384jj4444666888jfd123'));