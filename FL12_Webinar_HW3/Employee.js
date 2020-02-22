class Employee {
    constructor (props) {
        this.id = props.id;
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.birthday = props.birthday;
        this.salary = props.salary;
        this.position = props.posititon;
        this.departmen = props.departmen;
        Employee.EMPLOYEES.push(this)
    }

    static EMPLOYEES = [];

    get fullName () {
        return `${this.firstName} ${this.lastName}`
    }
    get age () {
        const diff = Date.now() - new Date(this.birthday).getTime();
        return parseInt(String(diff / ( 1000 * 60 * 60 * 24 * 365 )), 10)
    }
    quit() {
        Employee.EMPLOYEES.splice(Employee.EMPLOYEES.indexOf(this), 1);
    }
    changeDepartment (newDepartment) {
        this.departmen = newDepartment;
    }
    changePosition (newPosition) {
        this.position = newPosition;
    }
    changeSalary (newSalary) {
        this.salary = newSalary;
    }
    retire () {
        this.quit();
        console.log('It was such a pleasure to work with you!')
    }
    getFired () {
        this.quit();
        console.log('Not a big deal!')
    }
    getPromoted ({salary = this.salary, position = this.position, department = this.department}) {
        this.salary = salary;
        this.position = position;
        this.departmen = department;
        console.log('Yoohoooo!')
    }
    getDemoted ({salary = this.salary, position = this.position, department = this.department}) {
        this.salary = salary;
        this.position = position;
        this.departmen = department;
        console.log('Damn!')
    }
}

class Manager extends Employee {
    constructor(props) {
        super(props);
        this.salary = props.salary;
    }
}

class BlueCollarWorker extends Employee {

}

class SalesManager extends Manager {
    constructor(props) {
        super(props);
        this.position = 'manager';
    }
    get managedEmployees() {
        return Employee.EMPLOYEES.filter(e => e.department === this.department && e.position !== this.position);
    }
}

class HRManager extends Manager {
    constructor(props) {
        super(props);
        this.position = 'hr';
    }
}

function ManagerPro(target, source) {
    Object.assign(target, source)
}

const salesManager = new SalesManager ({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    birthday: '10/04/1994',
    salary: 5000
});

const hrManager = new HRManager ({
    id: 2,
    firstName: 'Bob',
    lastName: 'Doe',
    birthday: '10/04/1994',
    salary: 5000
});

const blueCollarWorkerTwo = new BlueCollarWorker ({
    id: 4,
    firstName: 'Jane',
    lastName: 'Doe',
    birthday: '10/04/1994',
    salary: 5000,
    position: 'office worker',
    departmen: 'hr'
});

const blueCollarWorkerOne = new BlueCollarWorker ({
    id: 3,
    firstName: 'Mary',
    lastName: 'Doe',
    birthday: '10/04/1994',
    salary: 5000,
    position: 'office worker',
    departmen: 'sales'
});
