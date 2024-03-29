import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useGetUniversities } from 'src/hooks/useGetUniversities';
import { usePreviousNonNullish } from 'src/hooks/usePreviousNonNullish';
import { FormValues } from 'src/types';
import { ComboBox } from './ui/ComboBox';
import { Input } from './ui/Input';

const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      university: null,
    },
  });
  const [inputValue, setInputValue] = useState('');

  const { data, isLoading } = useGetUniversities(inputValue);

  const prevOptions = usePreviousNonNullish(data);

  const submit = handleSubmit((values) => {
    const { name, university } = values;
    alert(` Jméno: ${name}, Univerzita: ${university ? university.label : 'nevyplněno'}`);
  });

  return (
    <div className="form-container">
      <form className="form" onSubmit={submit}>
        <h3 className="title">With React Hook Form</h3>
        <fieldset className="fieldset">
          <Input
            label="Vaše křestni jmeéno"
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            {...register('name', { required: 'Toto pole je povinné' })}
          />
          <Controller
            name="university"
            control={control}
            render={({ field: { ref, onChange, value, name } }) => {
              return (
                <ComboBox
                  value={value}
                  handleChange={(newValue) => {
                    onChange(newValue);
                  }}
                  options={data || prevOptions}
                  inputValue={inputValue}
                  onInputChange={(_: unknown, val: string) => {
                    setInputValue(val);
                  }}
                  inputRef={ref}
                  isLoading={isLoading}
                  inputProps={{
                    fullWidth: true,
                    label: 'Univerzita na kterou chodite',
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
