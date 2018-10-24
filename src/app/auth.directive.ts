import { Directive, OnInit, TemplateRef, ViewContainerRef, Input } from "@angular/core";
import { UserService } from "./services/user.service";

@Directive({selector: '[authed]'})
export class AuthDirective implements OnInit{
    constructor(
        private userService : UserService,
        private templateRef : TemplateRef<any>,
        private viewContaner : ViewContainerRef
    ){}

    condition : boolean;

    ngOnInit(){
        this.userService.isAuthenticated.subscribe((isAuthenticated) => {
            if(isAuthenticated && this.condition || !isAuthenticated && !this.condition){
                this.viewContaner.createEmbeddedView(this.templateRef);
            }else{
                this.viewContaner.clear();
            }
        })
    }

    @Input() set authed(condition: boolean){
        this.condition = condition;
    }
}