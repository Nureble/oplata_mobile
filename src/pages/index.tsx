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
        {data?.map((operator) => (
          <Link href={`/${operator.id}`} key={operator.id}>
            <Card name={operator.name} />
          </Link>
        ))}
        <Link href="/add">
          <Button>+</Button>
        </Link>
      </Main>
    </Container>
  );
};

const Button = styled.button`
  color: white;
  background-color: black;
  height: 150px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 30px;
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

export default Home;
