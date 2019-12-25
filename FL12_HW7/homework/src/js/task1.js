
let allUsers = {
    'user@gmail.com': 'UserPass',
    'admin@gmail.com': 'AdminPass'
};
const emailsLength = 5,
      newPasswordLength = 6;
let askEmail, askPassword, changePassword, oldPassword, newPassword, newPasswordRepeat;
    askEmail = prompt('Enter your Email','').trim();
    if(!askEmail){
        alert('Canceled.');
    }else if(askEmail.length < emailsLength){
        alert('I don\'t know any emails having name length less than 5 symbols');
    }else if(Object.keys(allUsers).includes(askEmail)){
        askPassword = prompt('Enter your password','').trim();
        if(!askPassword){
            alert('Canceled.');
        }else{
            if(askPassword === allUsers[askEmail]){
                changePassword = confirm('Do you want to change your password?');
                if(!changePassword){
                    alert('You have failed the change.');
                }else{
                    oldPassword = prompt('Enter your old password','').trim();
                    if(!oldPassword){
                        alert('Canceled');
                    }else if(oldPassword === allUsers[askEmail]){
                        newPassword = prompt('Enter your new password','');
                        if(newPassword < newPasswordLength){
                            alert('It’s too short password. Sorry.');
                        }else{
                            newPasswordRepeat = prompt('Enter it again please');
                            if(newPassword === newPasswordRepeat){
                                allUsers[askEmail] = newPassword; 
                                alert('You have successfully changed your password.');
                            }else{
                                alert('You wrote the wrong password.');
                            }
                        }
                    }else{
                        alert('You wrote the wrong password.');
                    }
                }
            }else{
                alert('Wrong password');
            }
        }
    }else{
        alert('I don’t know you');
    }

