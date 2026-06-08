# MangGo - Manga on the Go (GenAI)

The App to generate AI-based Manga character images based on text prompts.


## Features

- Create anime image by AI through text-based prompting
- Gallery of all resulted images and persisted over browser refresh
- Re-use previous prompt and modify it to generate new similar images
- No login needed
- Simple and intuitive UI


## Tech Stack

- Frontend: NextJs (ReactJs)
- API GW: ExpressJs (NodeJs) - Prisma
- Database: SQLite
- AI Endpoint: Pollinations AI
- Image Storage: Cloudinary


## Installation

Make sure git and node version > 20 is installed and running

```bash
git clone https://github.com/aditiasap/manggo-webapp.git
cd manggo-webapp
npm install
```

## Setup Environment

create .env file in the root project, and fill in as below:

```bash
NEXT_PUBLIC_ENDPOINT='https://tukangaplikasi.com/manggo/api'
```

If you want to run the API GW as well on your local device, you need to change this into
http://localhost:37119/api


## Run in dev mode

```bash
npm run dev
```

