function addOne(x) {
    return x + 1;
}
function pipe(...arg){
   return arg.reduce((accumulator, currentValue)=>{
        return currentValue(accumulator)
    })
}
console.log(pipe(1, addOne, addOne))