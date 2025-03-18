# Industrial Painter

A professional painting services management application built with modern web technologies.

## Tech Stack

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="Material UI" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" alt="Styled Components" />
  <img src="https://img.shields.io/badge/FortAwesome-528DD7?style=for-the-badge&logo=font-awesome&logoColor=white" alt="Font Awesome" />
</div>

- **React** - UI library for building component-based interfaces
- **TypeScript** - Static typing for more robust code
- **Vite** - Next generation frontend tooling for fast development
- **Material UI** - React component library implementing Google's Material Design
- **React Router** - Declarative routing for React applications
- **Styled Components** - Visual primitives for the component age
- **Font Awesome** - Scalable vector icons that can be customized

## Features

- User authentication with secure login
- Responsive design works on desktop and mobile devices
- Form validation with immediate feedback
- Modern UI with smooth animations and transitions

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
