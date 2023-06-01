import React from "react";
import styled from "styled-components";

interface Props {
  name: string;
}
export const Card = ({ name }: Props) => {
  return <Container>{name}</Container>;
};

const Container = styled.div`
  color: #e5beec;
  background-color: #2a2f4f;
  height: 150px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 15px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #524b6e;
  }
`;
