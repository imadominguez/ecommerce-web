import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { CreateCategoryForm } from './create-category-form';

export const CreateCategoryInput = () => {
  return (
    <Card className="col-span-2 md:col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Crear Categoria</CardTitle>
        <CardDescription>Gestiona tus marcas.</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateCategoryForm />
      </CardContent>
    </Card>
  );
};
