export const API_URL: string = 'https://api.escuelajs.co/api/v1/';

interface Endpoint {
  products: string;
  categories: string;
}

export const ENDPOINT: Endpoint = {
  products: `${API_URL}products`,
  categories: `${API_URL}categories `,
};
