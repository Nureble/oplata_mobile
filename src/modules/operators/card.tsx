import React from "react";
import styled from "styled-components";
interface Props {
  name: string;
}
export const Card = ({ name }: Props) => {
  return <Container>{name}</Container>;
};

const Container = styled.div`
  color: white;
  background-color: black;
  height: 150px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
