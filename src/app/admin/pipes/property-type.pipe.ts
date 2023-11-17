import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propertyType',
})
export class PropertyTypePipe implements PipeTransform {
  transform(propertyId: number): string {
    switch (propertyId) {
      case 10014:
        return 'Casa Unifamiliar';
      case 10015:
        return 'Apartamento';
      case 10016:
        return 'Piso';
      case 10017:
        return 'Duplex';
      case 10018:
        return 'Loft';
      case 10019:
        return 'Casa Movil';
      case 10020:
        return 'Finca';
      case 10021:
        return 'Penthouse';
      case 10022:
        return 'Oficina Comercial';
      case 10023:
        return 'Cabaña';

      default:
        return 'Desconocido';
    }
  }
}
