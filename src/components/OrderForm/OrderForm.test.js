import React from 'react';
import OrderForm from './OrderForm';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';

describe('OrderForm', () => {
  it('should render correctly', () => {
    render(
      <OrderForm addOrder={ jest.fn() }/>
    )

    const nameForOrder = screen.getByPlaceholderText('Name');
    expect(nameForOrder).toBeInTheDocument();
  })

  it('should render input and ingredient buttons', () => {
    render(
      <OrderForm addOrder={ jest.fn() }/>
    )

    const nameInput = screen.getByPlaceholderText('Name');
    const beansButton = screen.getByRole('button', { name: /beans/i });
    const submitOrderButton = screen.getByRole('button', { name: /submit order/i });

    expect(nameInput).toBeInTheDocument();
    expect(beansButton).toBeInTheDocument();
    expect(submitOrderButton).toBeInTheDocument();
  })

  it('should be able to add a new order', () => {
    const mockAddOrder = jest.fn();
    render(
      <OrderForm addOrder={ mockAddOrder }/>
      )

    const submitOrderButton = screen.getByRole('button', { name: /submit order/i });

    fireEvent.click(submitOrderButton);

    expect(mockAddOrder).toHaveBeenCalled();
  })
})