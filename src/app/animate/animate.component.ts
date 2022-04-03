import { animate, style, transition, trigger } from '@angular/animations';
export const routingAnimation = trigger('routing',[
     transition('* <=> *',[
         style({opacity:0,transform : 'scale(0)'}),
         animate('500ms',style({opacity:1,transform : 'scale(1)'}))
     ]),

])

