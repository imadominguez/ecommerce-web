import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config({
  cloud_name: 'dqpj5d9d1',
  api_key: '919518468483841',
  api_secret: 'w2zJ7F15nwVK9G9Ymo-_H_7-iG8',
});

export async function POST(request: Request) {
  const { publicId } = await request.json();

  const results = await cloudinary.api.delete_resources([publicId]);
  revalidatePath('/dashboard/cloudinary');
  return Response.json({ data: results });
}
