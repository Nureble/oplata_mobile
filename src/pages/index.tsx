import { Card } from "@/modules/operators/card";
import { Operator } from "@/types/types";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

export const getStaticProps: GetStaticProps<{
  data: Operator[];
}> = async () => {
  const res = await fetch("http://localhost:3004/operators");
  const data = await res.json();
  return { props: { data } };
};

const Home = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container>
      <Main>
        <H1>Выберите оператора</H1>
        <FlexRow>
          {data?.map((operator) => (
            <Link href={`/${operator.id}`} key={operator.id}>
              <Card name={operator.name} />
            </Link>
          ))}
          <Link href="/add">
            <Button>Другой оператор</Button>
          </Link>
        </FlexRow>
      </Main>
    </Container>
  );
};

const FlexRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
`;

const H1 = styled.h1`
  color: #2a2f4f;
  padding-bottom: 15px;
`;

const Button = styled.button`
  color: #e5beec;
  background-color: #2a2f4f;
  height: 150px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 15px;
  border-radius: 15px;
  transition: background-color 0.3s;
  opacity: 1;
  transition: opacity 0.3s;

  &.fade-in {
    opacity: 0;
  }

  &:hover {
    background-color: #524b6e;
  }
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

const Main = styled.main`
  color: grey;
  background-color: #e5beec;
  padding: 20px;
  text-align: center;
  flex-wrap: wrap;
  gap: 15px;
  border-radius: 15px;
`;

export default Home;
