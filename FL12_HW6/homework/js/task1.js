let a = parseInt(prompt('Number A:',''));
let b = parseInt(prompt('Number B:',''));
let c = parseInt(prompt('Number C:',''));
let n2 = 2;
let n4 = 4;
let result, x1, x2;
    if(a && !isNaN(b) && !isNaN(c)){
        result = b*b-n4*a*c;
        console.log(`Discriminant = ${result}`)
        if(result > 0){
            x1 = (-b- Math.sqrt(result)) / (n2*a);
            x2 = (-b+ Math.sqrt(result))/ (n2*a);
            console.log(`x1 = ${x1}; x2 = ${x2}`)
        }else if(result === 0){
            x1 = (-b- Math.sqrt(result)) / (n2*a);
            console.log(`x = ${x1}`)
        }else{
            console.log('no solution')
        }
    }else{
        console.log(`Invalid input data`)
    }