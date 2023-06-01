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
  background-color: #2a2f4f;
  padding: 15px;
  border-radius: 15px;
  color: #e5beec;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #524b6e;
  }
`;

const Label = styled.label`
  color: #2a2f4f;
`;

const Input = styled.input`
  background-color: transparent;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #2a2f4f;
  min-width: 200px;
  color: #2a2f4f;
`;

const Main = styled.main`
  background-color: #e5beec;
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  border-radius: 15px;
`;

const Container = styled.div`
  color: grey;
  background-color: #2a2f4f;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Add;
