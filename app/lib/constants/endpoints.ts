export const server_endpoint: string = import.meta.env.VITE_SERVER_ENDPOINT

export const ENDPOINTS = {
  // USER: `${server_endpoint}/user/`
  USER: `${server_endpoint}/mocks/user.json`,
  MAPS: {
    'home-map': `${server_endpoint}/mocks/home-map.json`
  }
}
