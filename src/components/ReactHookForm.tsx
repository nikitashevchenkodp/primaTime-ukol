import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
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

  console.log(watch('university'));

  return (
    <div className="form-container">
      <h3>With React Hook Form</h3>{' '}
      <form className="form" onSubmit={handleSubmit((res) => console.log(res))}>
        <fieldset className="fieldset">
          <Input
            label="Name"
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            {...register('name', { required: 'This field is required' })}
          />
          <Controller
            name="university"
            control={control}
            rules={{ required: 'This field is required' }}
            render={({ field: { ref, onChange, value, name }, fieldState: { error } }) => {
              return (
                <ComboBox
                  value={value}
                  handleChange={(newValue) => {
                    onChange(newValue);
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
        <button className="btn" type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default ReactHookForm;
