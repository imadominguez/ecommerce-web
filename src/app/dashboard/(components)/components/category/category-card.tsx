import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CreateCategoryForm } from './create-category-form';

export const CategoryCard = async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias</CardTitle>
        <CardDescription>Gestiona tus categorias.</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateCategoryForm />
      </CardContent>
    </Card>
  );
};
