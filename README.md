# Pahtia Labs Website - Refactored Structure

## 📁 Project Structure

```
pahtia-labs-refactored/
├── App.jsx                          # Main application component
├── components/                      # Reusable UI components
│   ├── CalculationSteps.jsx        # Display step-by-step calculations
│   ├── DilutionCalculatorForm.jsx  # Form for dilution calculator
│   ├── DoseCalculatorForm.jsx      # Form for dose calculator
│   ├── InfoBanner.jsx              # Information banner component
│   ├── InputRow.jsx                # Reusable input field with label
│   ├── LanguageSelector.jsx        # Language dropdown selector
│   ├── PahtiaLogo.jsx              # Company logo component
│   ├── ResultDisplay.jsx           # Display calculation results
│   ├── Tooltip.jsx                 # Tooltip component
│   └── UnitSelector.jsx            # Unit selection dropdown
├── calculators/                     # Calculator business logic
│   ├── doseCalculator.js           # Dose calculation logic
│   └── dilutionCalculator.js       # Dilution calculation logic
├── constants/                       # Configuration and constants
│   ├── translations.js             # All language translations
│   └── units.js                    # Unit definitions and validation
├── utils/                          # Utility functions
│   ├── unitConversions.js         # Unit conversion utilities
│   ├── validation.js              # Input validation functions
│   └── useLocalStorage.js         # Custom hook for localStorage
└── styles/                         # (Optional) CSS files if needed
```

## 🎯 Benefits of This Structure

### 1. **Separation of Concerns**
- **Components**: Pure UI components with no business logic
- **Calculators**: Business logic separated from presentation
- **Utils**: Reusable utility functions
- **Constants**: Configuration data in one place

### 2. **Easy to Scale**
To add a new calculator:
1. Create a new calculator file in `/calculators/` (e.g., `infusionRateCalculator.js`)
2. Create a form component in `/components/` (e.g., `InfusionRateForm.jsx`)
3. Add new mode in `App.jsx`
4. Add translations to `constants/translations.js`

### 3. **Maintainability**
- Small, focused files (100-200 lines each)
- Clear naming conventions
- Easy to find and fix bugs
- Easy to test individual components

### 4. **Reusability**
- Components like `InputRow`, `Tooltip`, `UnitSelector` can be used in any calculator
- Validation and conversion utilities are shared across all calculators
- Consistent UI patterns

## 🔧 How to Add a New Calculator

### Example: Adding an Infusion Rate Calculator

#### Step 1: Create Calculator Logic
Create `calculators/infusionRateCalculator.js`:

```javascript
export const calculateInfusionRate = ({
  dose,
  doseUnit,
  weight,
  concentration,
  concentrationUnit,
  translations
}) => {
  const steps = [];
  
  // Your calculation logic here
  // Return { result, steps } or { error }
  
  return {
    result: { rate: calculatedRate, unit: "mL/hr" },
    steps
  };
};
```

#### Step 2: Create Form Component
Create `components/InfusionRateForm.jsx`:

```javascript
import InputRow from './InputRow';
import UnitSelector from './UnitSelector';

export default function InfusionRateForm({
  // ... props
  onCalculate,
  onReset,
  translations
}) {
  return (
    <>
      <InputRow label={translations.dose} /* ... */ />
      <InputRow label={translations.weight} /* ... */ />
      {/* ... more inputs */}
      
      <div className="flex gap-3 mt-6">
        <button onClick={onCalculate}>
          {translations.calculate}
        </button>
        <button onClick={onReset}>Reset</button>
      </div>
    </>
  );
}
```

#### Step 3: Add to App.jsx
```javascript
// Import the new components
import { calculateInfusionRate } from './calculators/infusionRateCalculator';
import InfusionRateForm from './components/InfusionRateForm';

// Add new state variables
const [infusionDose, setInfusionDose] = useState("");
// ... other state

// Add mode button
<button onClick={() => { setMode("infusion"); resetAll(); }}>
  {t.modeInfusion}
</button>

// Add case in the form section
{mode === "infusion" && (
  <InfusionRateForm
    dose={infusionDose}
    setDose={setInfusionDose}
    // ... other props
    onCalculate={handleInfusionCalculation}
    onReset={resetAll}
    translations={t}
  />
)}
```

#### Step 4: Add Translations
In `constants/translations.js`:
```javascript
export const translations = {
  en: {
    // ... existing translations
    modeInfusion: "Calculate Infusion Rate",
    dose: "Dose",
    weight: "Weight",
    // ... more translations
  },
  // ... other languages
};
```

## 📚 Key Files Explained

### `App.jsx`
- Main orchestrator
- Manages state
- Routes between different calculators
- Minimal logic, delegates to calculator modules

### `calculators/doseCalculator.js`
- Pure functions
- Takes inputs, returns results
- No UI dependencies
- Easy to unit test

### `components/InputRow.jsx`
- Reusable input component
- Handles label, tooltip, validation styling
- Used across all calculators

### `utils/validation.js`
- Validation functions used throughout app
- Single source of truth for validation rules

## 🎨 Styling Guidelines

- Use Tailwind CSS classes consistently
- Keep styling in components, not in calculators
- Use CSS variables for theme consistency (if needed)

## 🧪 Testing Strategy

Each module can be tested independently:

```javascript
// Example test for doseCalculator.js
import { calculateDose } from './calculators/doseCalculator';

test('calculates correct volume for single vial', () => {
  const result = calculateDose({
    vialStrength: 50,
    vialUnit: 'mg',
    vialVolume: 10,
    desiredStrength: 25,
    desiredUnit: 'mg',
    translations: englishTranslations,
    language: 'en'
  });
  
  expect(result.result.volume).toBe(5);
});
```

## 🚀 Future Enhancements

1. **Add More Calculators**
   - Infusion rate calculator
   - Drip rate calculator
   - BMI calculator
   - Creatinine clearance

2. **Add User Preferences**
   - Default units
   - Favorite calculators
   - History of calculations

3. **Add Data Export**
   - PDF export of calculations
   - Save calculation history

4. **Add Testing**
   - Unit tests for calculators
   - Component tests
   - E2E tests

## 📝 Migration Guide

To migrate from the old code to this structure:

1. Copy component JSX into appropriate component files
2. Move calculation logic to calculator files
3. Move translations to constants file
4. Update imports in App.jsx
5. Test each calculator individually

## 🤝 Contributing

When adding new features:
1. Follow the existing file structure
2. Keep components small and focused
3. Add appropriate JSDoc comments
4. Update translations for all languages
5. Test before committing

---

**Built with ❤️ by Pahtia Labs**