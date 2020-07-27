import React, { useRef } from 'react';
import { Form } from '@unform/web';
import Input from './components/Form/Input';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
import './App.css';

const initialData = {
  email: 'wellinton@tentaculo.digital',
  address: {
    city: 'Balneário Camboriú',
  }
}



function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {

    // if (data.name === ""){
    //   formRef.current.setErrors({
    //     name: 'O nome é obrigatório',
    //     email: 'O email é obrigatório',
    //   });
    // }

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nom é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, 'No minimo 3 caracteres')
            .required('A cidade é obrigatória')
        })
      });

      await schema.validate(data, {
        abortEarly: false,
      })
      console.log(data);

      formRef.current.setErrors({});


      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError){
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
        // console.log(err);
      }
    }
  }

  return (
    <div className="App">
      <h1>Hello World!</h1>

      <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
        <Input type="nome" name="name" />
        <Input type="email" name="email" />

        {/* <Input name="address.streel" />
        <Input name="address.number" /> */}

        <Scope path="address">
          <Input name="streel" />
          <Input name="number" />
          <Input name="city" />
        </Scope>



        <button type="submit">Enviar!</button>
      </Form>



    </div>
  );
}

export default App;
