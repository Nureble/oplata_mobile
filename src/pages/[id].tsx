import { Operator, Statuses } from "@/types/types";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import router, { useRouter } from "next/router";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import InputMask from "react-input-mask";

export const getStaticProps: GetStaticProps<{
  data: Operator;
}> = async (context) => {
  const id = context.params?.id;

  const res = await fetch(`http://localhost:3004/operators/${id}`);
  const data = await res.json();

  return { props: { data } };
};

export const getStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

const OperatorPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState(Statuses.DEFAULT);
  const router = useRouter();

  const deleteOperator = async () => {
    await fetch(`http://localhost:3004/operators/${data.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    router.back();
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e?.target?.value);
  };
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e?.target?.value);
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const random = Math.floor(Math.random() * 100);
    setStatus(Statuses.LOADING);
    setTimeout(() => {
      if (random > 50) {
        setStatus(Statuses.SUCCESS);
      } else if (random <= 50) {
        setStatus(Statuses.ERROR);
      }
    }, 1000);
  };

  useEffect(() => {
    if (status === Statuses.SUCCESS) {
      setTimeout(() => {
        router.back();
      }, 1000);
    }
  }, [status, router]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <OperatorName>{data.name}</OperatorName>
        <Label htmlFor="phone">Номер телефона:</Label>
        <Input
          mask="+9 (999) 999-9999"
          type="tel"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Введите номер"
          required
        />

        <Label htmlFor="price">Сумма:</Label>
        <Input
          mask=""
          type="number"
          id="price"
          value={price}
          onChange={handlePriceChange}
          placeholder="100р"
          min="1"
          max="1000"
          required
        />

        <Button disabled={status === Statuses.LOADING} type="submit">
          Пополнить
        </Button>
        {status === Statuses.ERROR && <Status status={status}>ОШИБКА</Status>}
        {status === Statuses.SUCCESS && (
          <Status status={status}>УСПЕШНО</Status>
        )}
        {status === Statuses.LOADING && (
          <Status status={status}>ЗАГРУЗКА</Status>
        )}

        <Button
          disabled={status === Statuses.LOADING}
          type="button"
          onClick={deleteOperator}
        >
          Удалить оператора
        </Button>
        <Button
          disabled={status === Statuses.LOADING}
          type="button"
          onClick={router.back}
        >
          Назад
        </Button>
      </Form>
    </Container>
  );
};

const OperatorName = styled.h1`
  color: #2a2f4f;
  font-weight: bold;
`;

const Status = styled.span<{ status: Statuses }>`
  color: ${({ status }) =>
    status === Statuses.SUCCESS
      ? "green"
      : status === Statuses.ERROR
      ? "red"
      : "blue"};
  font-weight: bold;
`;

const Button = styled.button`
  background-color: #2a2f4f;
  border: 1px solid black;
  padding: 15px;
  color: #e5beec;
  border-radius: 15px;
  transition: background-color 0.3s;
  cursor: pointer;
  height: 50px;
  width: 200px;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  &:hover {
    background-color: #524b6e;
  }
`;

const Label = styled.label`
  color: #2a2f4f;
`;

const Input = styled(InputMask)`
  background-color: transparent;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
  min-width: 200px;
`;

const Container = styled.div`
  color: #2a2f4f;
  background-color: #2a2f4f;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  color: #2a2f4f;
  background-color: #e5beec;
  width: 70%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  border-radius: 15px;
`;
export default OperatorPage;
