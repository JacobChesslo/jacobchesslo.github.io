# Project: Personal Website

## Project Description

My personal website.

## Tech Stack

- Frontend: Astro, SolidJS, Typescript, TailwindCSS

## Code Conventions

- We use Prettier for formatting
- ESLint for linting
- 2-space indentation
- camelCase for variables and functions
- PascalCase for components and classes

## Project Structure

- /src - Main source code
  - /components - React components
  - /pages - Page components
  - /utils - Utility functions
  - /hooks - Custom React hooks
  - /styles - CSS/SCSS files
- /public - Static assets
- /tests - Test files

## Important Notes

- New components should have a companion test file
- CV content lives in a git submodule at `src/content/curriculum-vitae` (https://github.com/JacobChesslo/curriculum-vitae). Run `git submodule update --init` after cloning.

## Instructions for Claude

- Always suggest TypeScript types for new functions
- Prioritize performance optimizations
- Include JSDoc comments for public functions
