function isLeapYear(d) {
    let getYear = new Date(d).getFullYear();
        if(!getYear) {
            return 'invalid Date';
        }else if( (getYear % 4 === 0) && (getYear % 100 !== 0) ||
                    (getYear % 400 === 0) ) {
            return `${getYear} is a leap year`;
        }else{
            return `${getYear} is not a leap year`;
        }
  }
  
  console.log(isLeapYear('2020-01-01 00:00:00'));
  