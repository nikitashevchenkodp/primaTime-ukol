import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import './App.scss';
import { ComboBox } from './components/ui/ComboBox';
import { Input } from './components/ui/Input';

const opts = [
  { value: 'Test 1 a', label: 'Test 1 a' },
  { value: 'Test 2 ab', label: 'Test 2 ab' },
  { value: 'Test 3 abc', label: 'Test 3 abc' },
  { value: 'Test 4 abcd', label: 'Test 4 abcd' },
  { value: 'Test 5 abcde', label: 'Test 5 abcde' },
  { value: 'Test 6 abcdei', label: 'Test 6 abcdei' },
  { value: 'Test 7 abcdeif', label: 'Test 7 abcdeif' },
];

function App() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      name: '',
      university: null,
    },
  });

  const [options, setOptions] = useState(opts);
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    setOptions(() => opts.filter((opt) => opt.label.includes(inputVal)));
  }, [inputVal]);

  const handleInputChange = (_: unknown, val: string) => {
    setInputVal(val);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit((res) => console.log(res))}>
        <fieldset className="fieldset">
          <Input label="Name" fullWidth {...register('name')} />
          <Controller
            name="university"
            control={control}
            rules={{ required: 'This field is required' }}
            render={({ field: { ref, onChange, value, name }, fieldState: { error } }) => {
              return (
                <ComboBox
                  value={value}
                  handleChange={(newValue) => {
                    if (newValue) {
                      onChange(newValue);
                    }
                  }}
                  options={options}
                  inputValue={inputVal}
                  onInputChange={handleInputChange}
                  inputRef={ref}
                  inputProps={{
                    error: !!error?.message,
                    helperText: error?.message,
                    fullWidth: true,
                    label: 'University',
                    name,
                  }}
                />
              );
            }}
          />
        </fieldset>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
