import { useState } from 'react';
import { ComboBox } from './ui/ComboBox';
import { Input } from './ui/Input';

const opts = [
  { value: 'Test 1 a', label: 'Test 1 a' },
  { value: 'Test 2 ab', label: 'Test 2 ab' },
  { value: 'Test 3 abc', label: 'Test 3 abc' },
  { value: 'Test 4 abcd', label: 'Test 4 abcd' },
  { value: 'Test 5 abcde', label: 'Test 5 abcde' },
  { value: 'Test 6 abcdei', label: 'Test 6 abcdeiasdfsd hjsdfjh sjdfjh sjdhfj sdjhfjsdjfasdfas' },
  { value: 'Test 7 abcdeif', label: 'Test 7 abcdeif' },
];

const PlainForm = () => {
  const [value, setValue] = useState<any>(null);
  return (
    <div className="form-container">
      <h3>Plain form</h3>
      <form className="form">
        <fieldset className="fieldset">
          <Input label="Name" fullWidth />

          <ComboBox
            value={value}
            handleChange={(newValue) => {
              setValue(newValue);
            }}
            options={opts}
            inputProps={{
              fullWidth: true,
              label: 'University',
            }}
          />
        </fieldset>
        <button className="btn" type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default PlainForm;
