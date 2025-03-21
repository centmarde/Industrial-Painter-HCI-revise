# Industrial Painter

A professional painting services management application built with modern web technologies.

## Tech Stack

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="Material UI" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
  <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" alt="Styled Components" />
  <img src="https://img.shields.io/badge/FortAwesome-528DD7?style=for-the-badge&logo=font-awesome&logoColor=white" alt="Font Awesome" />
  <img src="https://img.shields.io/badge/React_Toastify-FFC107?style=for-the-badge&logo=react&logoColor=black" alt="React Toastify" />
</div>

- **React 19** - Modern UI library for building component-based interfaces
- **TypeScript 5.7** - Static typing for more robust code
- **Vite 6** - Next generation frontend tooling for fast development
- **Material UI 6** - React component library implementing Google's Material Design
- **React Router 7** - Declarative routing for React applications
- **Firebase 11** - Backend-as-a-service for authentication and database
- **Axios** - Promise-based HTTP client for API requests
- **Zustand** - Lightweight state management solution
- **Styled Components** - Visual primitives for the component age
- **Font Awesome** - Scalable vector icons that can be customized
- **React Toastify** - Notification system for React applications
- **date-fns** - Modern JavaScript date utility library

## Features

- User authentication with secure login via Firebase
- Responsive design works on desktop and mobile devices
- Form validation with immediate feedback
- Modern UI with smooth animations and transitions
- Toast notifications for user feedback

## Development

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Expanding the ESLint configuration

For improved code quality, we recommend enabling type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
