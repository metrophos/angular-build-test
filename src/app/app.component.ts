import { Component } from '@angular/core';

@Component({
    selector: 'example-app',
    template: `
        <h1>{{title}}</h1>
        <p>Dummy-Component for Demos ...</p>
    `
})
export class AppComponent {
    title = 'Example';
}
