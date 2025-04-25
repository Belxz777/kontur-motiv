// // import { createWriteStream } from 'fs';
// // import { NextApiRequest, NextApiResponse } from 'next';
// // import { join } from 'path';
// // import { promisify } from 'util';
// // import stream from 'stream';
// // import { NextResponse } from 'next/server';

// // const pipeline = promisify(stream.pipeline);

// // export const config = {
// //   api: {
// //     bodyParser: false, // Отключаем стандартный парсер
// //   },
// // };

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get('file') as File;
    
//     if (!file) {
//       return NextResponse.json(
//         { error: 'No file provided' },
//         { status: 400 }
//       );
//     }

//     const publicDir = join(process.cwd(), 'public');
//     const fileName = file.name.replace(/[^a-z0-9\._-]/gi, '_').toLowerCase();
//     const filePath = join(publicDir, fileName);

//     // Проверка существования файла
//     if (require('fs').existsSync(filePath)) {
//       return NextResponse.json({ error: 'File already exists' }, { status: 409 });
//     }

//     // Сохраняем файл
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
    
//     await require('fs').promises.writeFile(filePath, buffer);
    
//     return NextResponse.json({ success: true, path: `/public/${fileName}` }, {status: 200});
//   } catch (error) {
//     console.error('Upload error:', error);
//     return NextResponse.json({ error: 'Failed to upload file' }, {status: 500});
//   }
// }
// // export async function GET() {
// //     return NextResponse.json(
// //       { error: 'Method not allowed' },
// //       { status: 405 }
// //     );
// //   }