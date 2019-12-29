function getMin(...arg){
    let num = Infinity;
    for(let i=0; i<arg.length;i++){
        num>arg[i] ? num=arg[i]: false;
    }
    return num
}
console.log(getMin(3, 0, -3))