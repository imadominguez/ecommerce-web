import { getCategories } from '@/actions/products/get-all-categories';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sleep } from '@/utils/sleep';
import Link from 'next/link';

export const SelectCategory = async () => {
  await sleep(5);

  const { ok, message, categories } = await getCategories();

  if (!ok && message === 'No hay categorias creadas.') {
    return (
      <div className="grid w-full cursor-not-allowed place-content-center rounded bg-muted py-3">
        <Link href={'/dashboard/category'}>Crear categoria</Link>
      </div>
    );
  }

  if (!ok) {
    return (
      <div className="grid w-full cursor-not-allowed place-content-center rounded bg-muted py-3">
        <small>{message}</small>
      </div>
    );
  }

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={'Selecciona una categoria'} />
      </SelectTrigger>
      <SelectContent id="category">
        <SelectGroup>
          {categories.map(({ id, name }) => {
            return (
              <SelectItem key={id} value={name}>
                {name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
