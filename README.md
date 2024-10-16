This is the Test Assment for Mira University using Next.js Page router. The project uses local file to simulate the database.

## Getting Started

First, run the development server:

```bash
npm run dev
```

## Folder Structure

### 1. `pages/`

The `pages/` folder contains reusable UI pages used throughout the app. Components are modular, allowing for code reusability and clean separation of concerns. These may include cards, forms, layout, navigation, modal and sections.

- **Pages Folder Structure**:
  ```bash
    pages/
    ├── index.ts              # Home page, accessible at '/', redirects to '/students'
    ├── about.js              # About page, accessible at '/about'
    ├── students/
    │   └── [id].ts           # Dynamic route for student details, accessible at '/studentss/[id]'
    └── api/
        └── students/
            ├── index.ts      # API route for to list students and create new student, accessible at '/api/students'
            └── [id].ts       # API route to get, edit or delette a particular student,, accessible at '/api/students/[id]'
  ```

The file `page.d.ts` describes a type which extends the default NextPage and used to share layouts and persist component state between pages. This is necessary because the NextPage interface as for some reason it does not include the getLayout function out of the box.

##### Code for page.d.ts

    ```ts
    import { NextPage } from 'next';
    import { ComponentType, ReactElement, ReactNode } from 'react';

    export type NextPageWithLayout<P = {}> = NextPage<P> & {
    getLayout?: (_page: ReactElement) => ReactNode;
    layout?: ComponentType;
    };
    ```

### 2. `components/`

The `components/` folder contains reusable UI components used throughout the app. Components are modular, allowing for code reusability and clean separation of concerns. These may include cards, forms, layout, navigation, modal and sections.

- **Components Folder Structure**:
  ```bash
  components/
    ├── card
    ├── form
    ├── modal
    ├── navigation
    ├── section
    └── templates
  ```

#### BaseTemplate Component

The `BaseTemplate` component provides a base structure that can be extended by other components. It accepts all native `div` properties, along with an optional `className` prop to allow further customization. This component can be used as a foundation for building various UI elements in a consistent and reusable manner.

##### Code for the template

    ```ts
    export interface IBaseTemplate extends React.ComponentPropsWithoutRef<'div'> {}

    const BaseTemplate: React.FC<IBaseTemplate> = ({ className, ...divProps }) => {
    return <div className={`${className}`} {...divProps}></div>;
    };

    export default BaseTemplate;
    ```

### 3. `lib/`

The `lib/` folder contains helper functions, type declarations and mock documents.

- **lib Folder Structure**:
  ```bash
  lib/
    ├── helpers.ts
    ├── mock.ts
    └── types.d.ts
  ```

### 4. `public/`

The `public/` folder contains files that are publicly available.

- **public Folder Structure**:
  ```bash
  public/
    ├── favicon.ico         # The favicon file
    └── students.json       # The local database
  ```

## Project

## Deployment on Vercel

The assesment is [live](https://philip-miva-test.vercel.app) on Vercel Platform.

It should be noted that since this project is deployed on Vercel's serveless functions, the app cannot have permission to write into the file system an hence POST, PUT and DELETE requests will fail when using the project live. These feature however work seamlessly on local ebnvironment and when deployed on dedicated servers.

## Testing

Jest has been configured on the project for Next.js and Typescript. To run tests:

```bash
npm run test
```

If you want to run tests while making changes:

```bash
npm run test:watch
```
