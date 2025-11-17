<h1 align="center">Candidate Personal DB</h1>

<p align="center">
  <img src="docs/logo.png" alt="logo" width="120px" height="120px"/>
  <br>
  <em> Reactive Form Example with Angular 20 and NestJs
    <br>A full-stack candidate management application built with Angular 20, NestJS, and Nx monorepo. 
    <br> Upload Excel files with candidate data and manage profiles efficiently with instant processing and persistent storage locally.</em>
  <br>
</p>

<p align="center">
  <a href="docs/DEVELOPMENT.md">Development Guidelines</a>
  <br>
  <br>
</p>

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-v20.0+-DD0031?logo=angular)](https://angular.io)
[![NestJS](https://img.shields.io/badge/NestJS-v10.0+-ea2845?logo=nestjs)](https://nestjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8--x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![NX](https://img.shields.io/badge/NX-22.0.3-4A90E2?logo=nx)](https://nx.dev)
[![Monorepo](https://img.shields.io/badge/Monorepo-Nx-000000)](https://nx.dev)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier_2.6.2-f8bc45?logo=prettier)](https://prettier.io)
[![Linting: ESLint](https://img.shields.io/badge/linting-ESLint_8.57.0-4B32C3?logo=eslint)](https://eslint.org)
[![Testing: Jest](https://img.shields.io/badge/test-Jest_30.2.0-C21325?logo=jest)](https://jestjs.io)

</div>

<hr>

## Tech Stack

- **Frontend**: Angular 20 (Standalone Components), Angular Material, RxJS
- **Backend**: NestJS, Express, Multer for file uploads
- **Monorepo**: Nx workspace with shared libraries
- **Testing**: Jest for unit testing
- **Validation**: class-validator, class-transformer
- **Excel Processing**: xlsx library

## Project Structure

```
candidate-personal-db/
├── apps/
│   ├── frontend/          # Angular 20 application
│   │   ├── src/app/
│   │   │   ├── components/
│   │   │   └── services/
│   │   └── project.json
│   └── backend/           # NestJS application
│       ├── src/
│       │   ├── candidates/
│       │   └── main.ts
│       └── project.json
└── libs/
    └── shared/            # Shared TypeScript types
        └── src/lib/models/
```

## Getting Started

### Prerequisites

- Node.js (v20)
- npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the backend server:

```bash
npm run serve:backend
```

3. Start the frontend application:

```bash
npm run serve:frontend
```

4. Open your browser and navigate to `http://localhost:4200`

### Excel File Format

The Excel file should contain a single row with the following columns:

- **Seniority**: "junior" or "senior"
- **Years of experience**: Number (e.g., 5)
- **Availability**: Boolean (true/false)

### API Endpoints

#### POST `/candidates/process`

Processes candidate data with Excel file upload.

**Request:**

- `name` (string, required): Candidate's first name
- `surname` (string, required): Candidate's last name
- `file` (Excel file, required): .xlsx or .xls file with candidate data

**Response:**

```json
{
  "name": "John",
  "surname": "Doe",
  "seniority": "junior",
  "years": 6,
  "availability": true
}
```

## Testing

Run all tests:

```bash
npm test
```

Run tests for specific project:

```bash
nx test frontend
nx test backend
nx test shared
```

## Build

Build all projects:

```bash
npm run build
```

Build specific project:

```bash
nx build frontend
nx build backend
```

## Run lint

Run lint check:

```bash
npm run lint
```

Run lint fix:

```bash
npm run lint:dix

```

## Run format

Run format check:

```bash
npm run format:check
```

Run format fix:

```bash
npm run format

```

## Architecture Highlights

### Frontend (Angular 20)

- **Standalone Components**: No NgModules, using new standalone API
- **Input Signals**: Modern component communication with `input()`
- **Reactive Forms**: Form validation and handling
- **OnPush Strategy**: Optimized change detection
- **Material Design**: Consistent UI with Angular Material
- **RxJS Patterns**: Reactive programming with observables

### Backend (NestJS)

- **Modular Architecture**: Feature-based modules
- **DTO Validation**: class-validator for request validation
- **File Upload**: Multer integration for Excel processing
- **Error Handling**: Comprehensive error responses
- **Type Safety**: Shared types with frontend

### Shared Library

- **Type Definitions**: Common interfaces and types
- **Monorepo Benefits**: Single source of truth for data models
