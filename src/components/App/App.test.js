
import React from 'react';
import App from './App';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {getOrders} from '../../apiCalls';
jest.mock('../../apiCalls');

const mockedOrders = { 
  orders: [{
    id: 1,
    name: 'Cam',
    ingredients: ['carnitas']
  },
  {
    id: 2,
    name: 'Snuffleupagus',
    ingredients: ['beans']
  }]
}


describe('App', () => {
  beforeEach(() => {
    getOrders.mockResolvedValue(mockedOrders);
    render(
      <App />
      )
  })
  it('should render successfully', () => {
    
    const header = screen.getByText('Burrito Builder');

    expect(header).toBeInTheDocument();
  })

  it('should add a new order', async () => {
    getOrders.mockResolvedValue(mockedOrders);
    render(
      <App />
      )

    const orderNameInput = await waitFor(() => screen.getByPlaceholderText(/Name/i));
    const ingredient = screen.getByRole('button', { name: /beans/i });
    const submitButton = screen.getByRole('button', { name: /submit order/i });
    
    getOrders.mockResolvedValueOnce({orders: [...mockedOrders, {name: 'Human', ingredients: ['beans'], id: 3}]})

    fireEvent.type(orderNameInput, 'Human');
    fireEvent.click(ingredient);
    fireEvent.click(submitButton);

    const newOrderName = await waitFor(() => screen.getByText('Human'));
    const newOrderIngredient = screen.getByText('beans');

    expect(newOrderName).toBeInTheDocument();
    expect(newOrderIngredient).toBeInTheDocument();
  })
})