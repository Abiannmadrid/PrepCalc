# Component Dependency Diagram

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         App.jsx                             │
│  (Main orchestrator - manages state & routing)              │
└────────────┬───────────────────────────────┬────────────────┘
             │                               │
             │                               │
    ┌────────▼────────┐            ┌────────▼────────────┐
    │   Components    │            │   Calculators       │
    │   (UI Layer)    │            │  (Business Logic)   │
    └────────┬────────┘            └────────┬────────────┘
             │                               │
             │                               │
    ┌────────▼────────────────┐   ┌────────▼─────────────┐
    │                         │   │                      │
    │  - PahtiaLogo           │   │  - doseCalculator    │
    │  - LanguageSelector     │   │  - dilutionCalculator│
    │  - InfoBanner           │   │                      │
    │  - DoseCalculatorForm   │   └──────────┬───────────┘
    │  - DilutionCalculator   │              │
    │  - InputRow             │              │
    │  - UnitSelector         │       ┌──────▼──────────┐
    │  - Tooltip              │       │   Utils         │
    │  - ResultDisplay        │       │                 │
    │  - CalculationSteps     │       │  - validation   │
    │                         │       │  - conversions  │
    └─────────┬───────────────┘       │  - localStorage │
              │                       └─────────────────┘
              │
       ┌──────▼─────────┐
       │   Constants    │
       │                │
       │  - translations│
       │  - units       │
       └────────────────┘
```

## Data Flow

```
User Input
    ↓
Form Component (DoseCalculatorForm / DilutionCalculatorForm)
    ↓
Validation (utils/validation.js)
    ↓
App.jsx (handleCalculation)
    ↓
Calculator Logic (calculators/doseCalculator.js)
    ↓
Unit Conversion (utils/unitConversions.js)
    ↓
Result + Steps
    ↓
ResultDisplay + CalculationSteps Components
    ↓
User sees result
```

## Component Relationships

### Independent Components (No dependencies)
- PahtiaLogo
- Tooltip
- InfoBanner
- LanguageSelector

### Composed Components (Use other components)
- InputRow → uses Tooltip
- DoseCalculatorForm → uses InputRow, UnitSelector
- DilutionCalculatorForm → uses InputRow, UnitSelector

### Smart Components (Manage state)
- App.jsx → uses all components

### Pure Logic (No UI)
- calculators/doseCalculator.js
- calculators/dilutionCalculator.js
- utils/validation.js
- utils/unitConversions.js