import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user.interface';


@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(users: User[], sortBy?: keyof User | ''): User[] {
    switch (sortBy) {
      case 'id':
        return users.sort((a, b) => (a.id > b.id ? 1 : -1));

      case 'name':
        return users.sort((a, b) => (a.name > b.name ? 1 : -1));

      case 'surname':
        return users.sort((a, b) => (a.surname > b.surname ? 1 : -1));

      case 'email':
        return users.sort((a, b) => (a.email > b.email ? 1 : -1));

      default:
        return users;
    }
  }
}
