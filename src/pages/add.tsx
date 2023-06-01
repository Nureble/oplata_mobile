import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";

const Add = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  console.log(name);
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e?.target?.value);
  };
  const createOperator = async () => {
    const res = await fetch(`http://localhost:3004/operators`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: uniqid(), name: name }),
    });
    router.back();
  };
  return (
    <Container>
      <Main>
        <Label htmlFor="NameOperator">Введите название:</Label>
        <Input id="NameOperator" value={name} onChange={handleNameChange} />

        <Button onClick={createOperator}>Добавить</Button>
      </Main>
    </Container>
  );
};

const Button = styled.button`
  background-color: white;
  border: 1px solid black;
  padding: 15px;
`;

const Label = styled.label`
  color: black;
`;

const Input = styled.input`
  background-color: transparent;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
  min-width: 200px;
`;

const Main = styled.main`
  color: grey;
  background-color: violet;
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
`;

const Container = styled.div`
  color: grey;
  background-color: tomato;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Add;
