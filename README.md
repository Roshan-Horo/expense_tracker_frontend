This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Project structure {#project-structure}

Repository for SparkCard Frontend : https://github.com/sparkfintec/sparkcard_frontend

By Cloning the repo, we will get the below folder structure :

```bash
root folder
├── components
│   ├── Card.tsx
│   ├── Header.tsx
│   └── Layout.tsx
├── constants
│   ├── contextConstants.ts
│   ├── cssConstanstants.ts
│   ├── notifyConstants.ts
│   └── validatorConstants.ts
├── context
│   ├── NotifyContext.tsx
│   └── UserContext.tsx
├── data
│   └── state.ts
├── hooks
│   ├── cardholder
│   │   └── useCreateCardHolder.ts
│   ├── customer
│   │    ├── useCreateCustomer.ts
│   │    └── useSearchCustomer.ts
│   ├── user
│   │    ├── useLogin.ts
│   │    ├── useSignup.ts
│   │    └── useLogout.ts
│   ├── wallet
│   │    ├── useCreateWallet.ts
│   │    └── useConfirmWallet.ts
│   ├── useAuthContext.ts
│   └── useNotifyContext.ts
├── pages
│   ├── login
│   │   └── index.tsx
│   ├── my_card
│   │   └── index.tsx
│   ├── onboard
│   │   └── index.tsx
│   ├── settings
│   │   └── index.tsx
│   └── shipping_info
│      └── index.tsx
├── public
│   ├── card.png
│   ├── favicon.ico
│   └── logo.png
├── styles
│   ├── card.module.css
│   └── globals.css
├── validators
│   ├── requestSchema.ts
│   └── validator.ts
├── .env
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── yarn.lock
```

### Project structure rundown {#project-structure-rundown}

- `/components/` - Contains all the components which can be used in multiple pages.
- `/constants/` - Contains the **constants** which can be used in application.
  - `/constants/contextConstants.ts` - Constants which are used in various context.
  - `/constants/cssConstants.ts` - Constants which can be used in CSS.
  - `/constants/notifyConstants.ts` - Constants which are used to show in the notification msg or description.
  - `/constants/validatorConstants.ts` - Constants which are used in various validatios.
- `/context/` - Contains different contexts which can be used in application, NotifyContext has data used for showing notification and UserContext has data for the user.
- `/data/` - This folder can be used to store any static data.
- `/hooks/` - This folder includes all the custom hooks that are used for interacting the backend services.
  - `/hooks/cardholder/` - This folder includes hookes related to cardholder.
  - `/hooksuser/` - This folder includes hookes related to user.
  - `/hooks/wallet/` - This folder includes hookes related to wallet.
  - `/hooks/useAuthContext.ts` - Hooks related to AuthContext.
- `/pages/` - This folder includes all the pages in the application.
  - `/login/` - This page is the login page that is rendered on ** /login**.
  - `/onboard/` - This page is the onbaord page that is rendered on ** /onboard**.
- `/public/` - Static directory that includes any images, svg, etc. Any contents inside here will be copied into the root of the final `build` directory
- `/styles/` - This the Styles folder that includes any CSS file or globals CSS.
- `/.env` - A **.env** config file containing the environment variable which are used in application. That may include backend URI, others sensitive data or key.
- `/next.config.js` - Config file for Next js.
- `/package.json` - Standard **package.json** file which is used to create node projects . You can install and use any npm packages you like in them
- `/tailwind.config.js` - Config file for using tailwind CSS.
- `/tsconfig.js` - Config file for TypeScript.
