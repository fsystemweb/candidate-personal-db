# Candidate Personal DB

A full-stack candidate management application built with Angular 20, NestJS, and Nx monorepo. Upload Excel files with candidate data and manage profiles efficiently with instant processing and persistent storage.

## Features

- **Excel File Processing**: Upload .xlsx/.xls files with candidate data
- **Real-time Validation**: Form and file validation with error handling
- **Persistent Storage**: Browser localStorage for data persistence
- **Material Design**: Modern UI with Angular Material components
- **Reactive Programming**: RxJS and Angular Signals for state management
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Testing**: Comprehensive Jest unit tests

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
│   │   │   │   ├── candidate-form/
│   │   │   │   ├── candidate-table/
│   │   │   │   └── candidate-container/
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

## Key Features Implementation

1. **File Upload & Validation**
   - File type validation (.xlsx, .xls only)
   - Excel parsing with error handling
   - Form validation with Material UI feedback

2. **Data Persistence**
   - Browser localStorage for client-side storage
   - Incremental candidate storage
   - Data survives page refresh

3. **User Experience**
   - Loading states during file processing
   - Error messages with Material snackbars
   - Responsive design for desktop and tablet
   - Pagination and sorting for candidate table

4. **Code Quality**
   - TypeScript strict mode
   - Comprehensive unit tests
   - ESLint and Prettier configuration
   - Nx workspace optimization

