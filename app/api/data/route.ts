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

    return NextResponse.json([
        {
          "id": "38b23a91-770c-4b7e-b2be-6e11cd3cacaf",
          "title": "Экспертность",
          "description": "Помогать принимать важные решения, задавать стандарты в команде.",
          "icon": "/expert.png"
        },
        {
          "id": "55633631-4ed2-4e7c-9185-c6c0b0bd45ca",
          "title": "Творчество",
          "description": "Вам хочется придумывать нестандартные решения, создавать что-то новое и необычное.",
          "icon": "/creativity.png"
        },
        {
          "id": "94caaaf4-0ea7-478f-bdd7-cf05fb03558c",
          "title": "Образ жизни",
          "description": "Вы цените комфортный ритм жизни, гибкость и баланс между делами и личным временем.",
          "icon": "/lifestyle.png"
        },
        {
          "id": "0f606e9e-6615-48ed-85d2-b6ab75405a94",
          "title": "Заработок",
          "description": "Ваш труд должен справедливо вознаграждаться, для вас важна возможность для роста дохода.",
          "icon": "/payment.png"
        },
        {
          "id": "fccf298c-1e53-420c-b52a-9f2420aa4fa8",
          "title": "Вклад",
          "description": "Вы хотите, чтобы ваша работа имела смысл и чувствуете, что ваша работа важна.",
          "icon": "/contribution.png"
        },
        {
          "id": "a66b457a-aa64-48d5-90ef-2fd45a05ad52",
          "title": "Команда",
          "description": "Вам нравится работать с единомышленниками, общаться, чувствовать, что вас поддержат.",
          "icon": "./team.png"
        },
        {
          "id": "b521fbe6-0617-46b5-8157-5795496d6b55",
          "title": "Статус",
          "description": "Ваша позиция в компании подчеркивает ваш профессионализм, вы заметны среди коллег.",
          "icon": "./status.png"
        },
        {
          "id": "2ea35da9-825a-4418-9c5b-fbb46d4ddb8e",
          "title": "Общение",
          "description": "Вы цените возможность живого общения, влияние на других и помощь людям.",
          "icon": "./talk.png"
        },
        {
          "id": "275fe58f-92fc-422b-a02f-15ea98a36067",
          "title": "Вызов",
          "description": "Вам интересны сложные задачи, которые заставляют вас расти и учиться новому.",
          "icon": "./vis.png"
        },
        {
          "id": "5aa66ac1-e642-49e1-8842-7d2e1971c5f2",
          "title": "Фидбэк",
          "description": "Вы цените возможность получения обратной связи и работы с руководством.",
          "icon": "./feedback.png"
        },
        {
          "id": "6cc7f8a1-ef6b-40b9-bf1e-c779f96c6ad3",
          "title": "Лидерство",
          "description": "Вы хотите вести за собой команду, принимать решения, влиять на других на равных.",
          "icon": "./feedback.png"
        },
        {
          "id": "77921084-88da-44b9-81df-2bb713b69a6b",
          "title": "dasdsdsad",
          "description": "dasasadsada",
          "icon": "https://masterpiecer-images.s3.yandex.net/5fd531dca6427c7:upscaled"
        }
      ]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read directory' }, { status: 500 });
  }
}