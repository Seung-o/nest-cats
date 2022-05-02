import { HttpException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number) {
    return value > 0
      ? value
      : new HttpException('Id should be larger than 0', 202);
  }
}
