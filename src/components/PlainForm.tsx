import { useState } from 'react';
import { useGetUniversities } from 'src/hooks/useGetUniversities';
import { usePreviousNonNullish } from 'src/hooks/usePreviousNonNullish';
import { ComboBox, ComboboxValue } from './ui/ComboBox';
import { Input } from './ui/Input';

type FormType = {
  name: string;
  university: ComboboxValue | null;
};

const PlainForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [form, setForm] = useState<FormType>({
    name: '',
    university: null,
  });
  const [nameError, setNameError] = useState('');

  const { data, isLoading } = useGetUniversities(inputValue);
  const prevOptions = usePreviousNonNullish(data);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, university } = form;
    if (!name.trim().length) {
      setNameError('Toto pole je povinné');
      return;
    } else {
      setNameError('');
    }

    alert(` Jméno: ${name}, Univerzita: ${university ? university.label : 'nevyplněno'}`);
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={submit}>
        <h3 className="title">Plain form</h3>
        <fieldset className="fieldset">
          <Input
            label="Name"
            fullWidth
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            error={!!nameError}
            helperText={nameError}
          />

          <ComboBox
            value={form.university}
            handleChange={(newValue) => {
              setForm((prev) => ({ ...prev, university: newValue }));
            }}
            inputValue={inputValue}
            onInputChange={(_: unknown, val) => setInputValue(val)}
            options={data || prevOptions}
            isLoading={isLoading}
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
