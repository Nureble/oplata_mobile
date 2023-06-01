import { Operator } from "@/types/types";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
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
  const [isStatus, setIsStatus] = useState<"succes" | "error" | "default">(
    "default"
  );
  const router = useRouter();

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e?.target?.value);
  };
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e?.target?.value);
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const random = Math.floor(Math.random() * 100);
    setTimeout(() => {
      if (random > 50) {
        setIsStatus("succes");
      } else if (random <= 50) {
        setIsStatus("error");
      }
    });
  };

  useEffect(() => {
    if (isStatus === "succes") {
      setTimeout(() => {
        router.back();
      }, 1000);
    }
  }, [isStatus, router]);

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

        <Button type="submit">Пополнить</Button>
        {isStatus === "error" && <Error>ОШИБКА</Error>}
        {isStatus === "succes" && <Succes>УСПЕШНО</Succes>}
      </Form>
    </Container>
  );
};

const OperatorName = styled.h1`
  color: black;
  font-weight: bold;
`;

const Succes = styled.span`
  color: green;
  font-weight: bold;
`;

const Error = styled.span`
  color: red;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: white;
  border: 1px solid black;
  padding: 15px;
`;

const Label = styled.label`
  color: black;
`;

const Input = styled(InputMask)`
  background-color: transparent;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
  min-width: 200px;
`;

const Container = styled.div`
  color: grey;
  background-color: tomato;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const Form = styled.form`
  color: grey;
  background-color: violet;
  width: 70%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  border-radius: 5px;
`;
export default OperatorPage;
