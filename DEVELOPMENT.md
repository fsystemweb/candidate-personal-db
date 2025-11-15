# Development Guide

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development servers:**

   ```bash
   # Backend (port 3000)
   npm run serve:backend

   # Frontend (port 4200) - in another terminal
   npm run serve:frontend
   ```

3. **Test the application:**
   - Open http://localhost:4200
   - Use the provided `sample-candidate.xlsx` file for testing
   - Fill in name and surname, upload the Excel file

## Project Structure

### Backend (NestJS)

- **Port:** 3000
- **API Endpoint:** POST `/candidates/process`
- **Features:**
  - Excel file parsing with `xlsx` library
  - Form data validation with `class-validator`
  - Error handling for invalid files/data
  - CORS enabled for frontend communication

### Frontend (Angular 17)

- **Port:** 4200
- **Architecture:** Standalone components
- **Features:**
  - Reactive forms with validation
  - Angular Material UI components
  - RxJS reactive programming
  - Local storage persistence
  - Table with pagination and sorting

### Shared Library

- **Purpose:** Type definitions shared between frontend and backend
- **Location:** `libs/shared/src/lib/models/`

## Testing

```bash
# Run all tests
npm run test:all

# Run specific project tests
npx nx test backend
npx nx test frontend
npx nx test shared
```

## Building

```bash
# Build all projects
npm run build:all

# Build specific project
npx nx build backend
npx nx build frontend
```

## Excel File Format

The Excel file should contain one row with these columns:

- **Seniority:** "junior" or "senior"
- **Years of experience:** Number (e.g., 5)
- **Availability:** Boolean (true/false)

Use the provided `sample-candidate.xlsx` for testing.

## Key Implementation Details

### Angular Features Used

- Standalone components (no NgModules)
- Input signals with `input()`
- Output signals with `output()`
- Reactive forms with validation
- OnPush change detection strategy
- RxJS operators (switchMap, tap, catchError, finalize)

### NestJS Features Used

- Modular architecture
- DTO validation with decorators
- File upload with Multer
- Global validation pipes
- Exception handling

### Development Tools

- Nx monorepo for project management
- Jest for unit testing
- ESLint for code quality
- TypeScript strict mode
- Angular Material for UI components

## Troubleshooting

### Common Issues

1. **Port conflicts:** Make sure ports 3000 and 4200 are available
2. **File upload errors:** Ensure Excel file has correct format and columns
3. **CORS issues:** Backend has CORS enabled, but check browser console for errors
4. **Build errors:** Run `npm install` if dependencies are missing

### Debug Mode

Start backend in debug mode:

```bash
npx nx serve backend --inspect
```

### Logs

Backend logs will show in the terminal where you started the server.
Frontend errors appear in browser developer console.
