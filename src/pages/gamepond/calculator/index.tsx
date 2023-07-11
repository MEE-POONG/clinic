import React, { useState } from 'react';
import styled from 'styled-components';

const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const CalculatorInput = styled.input`
  width: 240px;
  padding: 10px;
  font-size: 24px;
  text-align: right;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  font-size: 24px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;

const Calculator: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = (value: string) => {
    setInputValue((prevValue) => prevValue + value);
  };

  const handleClear = () => {
    setInputValue('');
  };

  const handleCalculate = () => {
    try {
      const result = eval(inputValue);
      setInputValue(result.toString());
    } catch (error) {
      setInputValue('Error');
    }
  };

  return (
    <CalculatorContainer>
      <CalculatorInput type="text" value={inputValue} readOnly />
      <ButtonContainer>
        <Button onClick={() => handleButtonClick('7')}>7</Button>
        <Button onClick={() => handleButtonClick('8')}>8</Button>
        <Button onClick={() => handleButtonClick('9')}>9</Button>
        <Button onClick={() => handleButtonClick('/')}>/</Button>
        <Button onClick={() => handleButtonClick('4')}>4</Button>
        <Button onClick={() => handleButtonClick('5')}>5</Button>
        <Button onClick={() => handleButtonClick('6')}>6</Button>
        <Button onClick={() => handleButtonClick('*')}>*</Button>
        <Button onClick={() => handleButtonClick('1')}>1</Button>
        <Button onClick={() => handleButtonClick('2')}>2</Button>
        <Button onClick={() => handleButtonClick('3')}>3</Button>
        <Button onClick={() => handleButtonClick('-')}>-</Button>
        <Button onClick={() => handleButtonClick('0')}>0</Button>
        <Button onClick={() => handleButtonClick('.')}>.</Button>
        <Button onClick={handleCalculate}>=</Button>
        <Button onClick={() => handleButtonClick('+')}>+</Button>
      </ButtonContainer>
      <Button onClick={handleClear}>Clear</Button>
    </CalculatorContainer>
  );
};

export default Calculator;
