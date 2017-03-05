import { Component} from '@angular/core';

@Component({
    selector: 'example-app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    get currentDate() {
        return new Date();
    }

}
