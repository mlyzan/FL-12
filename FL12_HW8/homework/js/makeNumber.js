function makeNumber(arg){
    let str = arg.split('');
    let newArr = str.filter(e => !isNaN(e));
    return newArr.join('')
}
console.log(makeNumber('erer384jjjfd123'))