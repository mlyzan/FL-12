//function convert
function convert(...arg){
    let arr = [];
    for(let i = 0; i< arg.length; i++){
       if(typeof arg[i] === 'string'){
           arr.push(+arg[i])
       }else{
           arr.push(`${arg[i]}`)
       }
    }
    return arr
}
console.log(convert('1', 2, 3, '4'))

// function executeforEach
function executeforEach(arg,callBack){
    for(let i=0; i<arg.length;i++){
        callBack(arg[i])
    }
}
executeforEach([1,2,3], function(el) { 
    console.log(el * 2)
 } )

//function mapArray
function mapArray(arg,callBack){
    let arr= [];
    for(let i =0; i< arg.length; i++){
        arr.push(callBack(+arg[i]))
    }
    return arr
}
console.log(mapArray([2, '5', 8], function(el) { 
    return el + 3 
} ))

// function filterArray
function filterArray(arg, callBack){
    let arr = [];
    for(let i =0; i<arg.length; i++){
       if(callBack(arg[i])){
        arr.push(arg[i])
       }
    }
    return arr
}
console.log(filterArray([2, 5, 8], function(el) {
     return el % 2 === 0 
    } ) )

// function flipOver
function flipOver(str){
    let newStr = '';
    for (let i = str.length - 1; i >= 0; i--) {
        newStr += str.charAt(i);
    }
    return newStr;
}
console.log(flipOver('hey world'))

// function makeListFromRange
function makeListFromRange(arg){
    let arr =[arg[0]];
    for(let i=arg[0]; i<arg[arg.length-1]; i++){
        let plus = arr[arr.length-1] + 1;
        arr.push(plus)
    }
    return arr
}
console.log(makeListFromRange([2, 7]))

// function getArrayOfKeys
const actors = [
    { name: 'tommy', age: 36 },
    { name: 'lee', age: 28 }
  ];
function getArrayOfKeys(){
    let arr = [];
    executeforEach(actors, function(el){
        arr.push(el.name)
    })
    return arr
}
console.log(getArrayOfKeys())

// function substitute
function substitute(arg){
    let arr ;
        arr = mapArray(arg, function(el){
            let newEl = el;
           if(el < 30){
              newEl = '*';
           }
           return newEl
        })
    return arr
}
console.log(substitute([58, 14, 48, 2, 31, 29]))

// function getPastDay
const date = new Date(2019, 0, 2);
function getPastDay(date, d){
    let name = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let newDay = date.getDate()-d;
    let newDate = new Date(date.getFullYear(), date.getMonth(), newDay);
        return `${newDate.getDate()}, (${newDate.getDate()} ${name[newDate.getMonth()]} ${newDate.getFullYear()})`
}
console.log(getPastDay(date, 365))

// function formatDate
function formatDate(d){
    let hour = d.getHours()<10 ? `0${d.getHours()}` : d.getHours();
    let minute = d.getMinutes()<10 ? `0${d.getMinutes()}` : d.getMinutes();
    return `"${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} ${hour}:${minute}"`
}
console.log(formatDate(new Date('6/15/2018 09:15:00')))