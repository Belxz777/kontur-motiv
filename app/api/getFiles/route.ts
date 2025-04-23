import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const publicDir = path.join(process.cwd(), 'public');
  
  try {
    const files = fs.readdirSync(publicDir)
      .filter(file => !file.startsWith('.')) // Исключаем скрытые файлы
      .map(file => ({
        name: file,
        path: `/public/${file}`
      }));

    return NextResponse.json({ files });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read directory' }, { status: 500 });
  }
}