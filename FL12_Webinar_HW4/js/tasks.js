
// 1 task
function max (arr) {
    return Math.max(...arr)
}
const array1 = [1, 2, 3, 4, 56, 7, 8, 76, 5, 241, 5, 356, 567, 2];
console.log(max(array1))

// 2 task
function copyArray (arr) {
    return [...arr]
}
const array2 =[1,2,3];
const copiedAraay = copyArray(array2);
console.log(array2, copiedAraay);
console.log(array2 === copiedAraay)

// 3 task
function addUniquedId (obj) {
    return {
        ...obj,
        id: Symbol(obj.name)
    }
}
console.log(addUniquedId({name: 123}))

// 4 task 
function regroupObject(oldObj) {
    let {id, age, university} = oldObj.details;
    return {
        university,
        user: {
            age,
            firstName: oldObj.name,
            id
        }
    }
}
const oldObj = {name: 'Someone', details: {id: 1, age: 11, university: 'UNI'}};
console.log(regroupObject(oldObj))

// 5 task 
function findUniqueElements (arr) {
    return [...new Set(arr.map(x => x))] 
}
const array5 = [1, 1, 23, 3, 4, 5, 6, 5, 4, 23, 2, 1, 1, 1, 1, 1];
console.log(findUniqueElements(array5))

// 6 task
let hide;
function hideNumber (num) {
    hide = num.split('').splice(6, 4).join('');
    return hide.padStart(9, '*')
}
const phoneNumber = '0123456789';
console.log(hideNumber(phoneNumber))

// 7 task
const required = () => { throw new Error('Missing property'); };
function add (...num) {
    if(num.length>1){
        return num.reduce((mem, n) => mem + n);
    }else {
        return required()
    }
}
console.log(add(1,2))

// 8 task
function logsArr (url) {
     return fetch(url)
        .then(request => request.text())
        .then(text => JSON.parse(text))
        .then((response) => {
            return response.sort((a,b)=>{
                let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
                    if (nameA < nameB) {
                         return -1
                    }
                    if (nameA > nameB){
                          return 1
                    }
                    return 0 
            })
        }).catch(error => console.log(`ERROR: ${error.stack}`));
}
logsArr('https://jsonplaceholder.typicode.com/users')

// 9 task
async function logsArrAsync (url) {
    try{
        const request = await fetch(url);
        const text = await request.text();
        const parse = await JSON.parse(text);
        return parse.sort((a,b)=>{
            let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
                if (nameA < nameB) {
                     return -1
                }
                if (nameA > nameB){
                      return 1
                }
                return 0 
        })
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}
logsArrAsync('https://jsonplaceholder.typicode.com/users')
