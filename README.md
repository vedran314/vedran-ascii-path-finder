# Path-Walker Challenge

A Next.js application that implements a path-walker algorithm to navigate through character maps, collect letters, and find the endpoint. This project was built as a solution to the ASCII-Path-Finder challenge.

## Project Overview

The path-walker follows these rules:
- Starts at the `@` character
- Follows a path of valid characters (`-`, `|`, `+`)
- Collects letters (A-Z) along the path
- Ends at the `x` character
- Maintains direction at intersections
- Handles various map layouts and edge cases

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **UI**: React, Tailwind CSS
- **Testing**: Jest for unit and integration tests
- **Language**: TypeScript
- **Architecture**: Functional programming approach with immutable data structures

## Project Structure

- `src/validators/` - Core path-walker implementation
- `src/utils/` - Utility functions for map and characters
- `src/features/` - UI components and features
- `src/lib/` - Test maps and data

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/vedran314/vedran-ascii-path-finder

# Install dependencies
npm install
```

## Running Tests

The project includes comprehensive tests for the path-walker implementation:

```bash
# Run all tests
npm test
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) or [https://vedran-ascii-path-finder.vercel.app/](https://vedran-ascii-path-finder.vercel.app/)

### Test Maps

The project includes several test maps with different challenges:
- Basic path navigation
- Going straight through intersections
- Collecting letters in order
- Handling complex paths
- Error handling for invalid maps

## Implementation Details

The path-walker is using a functional approach with these key components:

1. **Map Validation** - Ensures maps have valid start/end points
2. **Path Finding** - Determines the next valid move at each step
3. **Letter Collection** - Gathers letters along the path
4. **Direction Maintenance** - Preserves direction at intersections
5. **Error Handling** - Gracefully handles invalid maps and edge cases
