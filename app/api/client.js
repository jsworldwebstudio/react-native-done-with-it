import { create } from 'apisauce';

const apiClient = create({
  baseURL: 'http://10.0.0.25:9000/api'
});

// apiClient.get('/listings').then(response => {
//   if (!response.ok) {
//     response.problem
//   }
// });

export default apiClient;