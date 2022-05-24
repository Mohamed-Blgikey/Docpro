import { Pipe, PipeTransform } from '@angular/core';
import { reservation } from '../model/Reservation';
import { user } from '../model/user';

@Pipe({
  name: 'searchuser'
})
export class SearchuserPipe implements PipeTransform {

  transform(users:reservation[],name:string):reservation[]{
    if(name == '' || name == undefined){
      return users;
    }

    return users.filter((u:reservation)=>{
      return u.patient?.fullName.toLowerCase().includes(name.toLowerCase())
    })
  }

}
