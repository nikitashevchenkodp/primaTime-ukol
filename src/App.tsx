import { useForm } from 'react-hook-form';
import './App.scss';
import { Input } from './components/ui/Input';

function App() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      text: '',
      result: '',
    },
  });

  return (
    <div>
      <form className="form" onSubmit={handleSubmit((res) => console.log(res))}>
        <fieldset className="fieldset">
          <Input label="Text" fullWidth {...register('text')} />
          <Input label="Result" fullWidth {...register('result')} />
        </fieldset>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
