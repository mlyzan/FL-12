import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppService, Item } from '../app-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent {
    @Input() item: Item;
    @Output() public addUser = new EventEmitter();
    itemForm:any;
    edit:boolean = true;
    
    constructor(private appService: AppService){}
    
    ngOnInit(): void {
        let name = null;
        let email = null;
        let phone = null;
        if(this.item) {
            this.edit= false;
            name = this.item.name;
            email = this.item.email;
            phone = this.item.phone;
        }
        this.itemForm = new FormGroup({
            name: new FormControl(name, Validators.required),
            email: new FormControl(email, [Validators.required, Validators.minLength(4), Validators.email]),
            phone: new FormControl(phone, Validators.required)
        })
    };

    discard(): void {
        if(this.item) {
            this.edit = false;
        }else {
            this.addUser.emit(false);
        }
    };

    deleteItem(id:number): void {
        this.appService.deleteItem(id);
    };

    saveChanges(): void {
        let newUserData: Item;
        if(this.item) {
            newUserData = {
                ...this.item,
                ...this.itemForm.value
            };
            this.appService.editItem(newUserData);
            this.edit = false;
        }else {
            newUserData = {
                id: this.appService.getData().length + 1,
                ...this.itemForm.value
            };
            this.appService.addItem(newUserData);
            this.addUser.emit(false);
        }
    };

}