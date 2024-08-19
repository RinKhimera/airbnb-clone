<h1 align="center">rinbnb</h1>

<div align="center">
Peer-to-peer rental platform mimicking Airbnb's model, offering unique accommodations for travelers and hosts worldwide.
</div>

## Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

## Installation

**Cloning the Repository**

Open your terminal or command prompt, clone the repository, and navigate to the directory:

```bash
git clone https://github.com/RinKhimera/airbnb-clone.git
cd airbnb-clone
```

**Install the dependencies**

Install the project dependencies using npm or bun:

```bash
npm install
# or
bun install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
#Database
DATABASE_URL=

#Authentification with Kinde
KINDE_POST_LOGIN_REDIRECT_URL=
KINDE_POST_LOGOUT_REDIRECT_URL=
KINDE_SITE_URL=
KINDE_CLIENT_ID=
KINDE_CLIENT_SECRET=
KINDE_ISSUER_URL=

#Uploadthing
UPLOADTHING_APP_ID=
UPLOADTHING_SECRET=
```

## Getting Started

Run the development server:

```bash
npm run dev
# or
bun run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project. You're done!

## Tech Stack

- Next.js
- TailwindCSS
- Shadcn UI
- Prisma
- Neon
- TypeScript

## Deployment

This app is deployed on [Vercel Platform](https://vercel.com). It is the easiest way to deploy your Next.js app and it's from the creators of Next.js.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Author

[Samuel Pokam](https://github.com/RinKhimera)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⭐ Like what I'm doing? Give it a star
