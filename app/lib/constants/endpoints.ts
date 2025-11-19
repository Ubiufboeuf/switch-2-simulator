import { SERVER_ENDPOINT } from './env_vars'

export const ENDPOINTS = {
  // USER: `${SERVER_ENDPOINT}/user/`
  USER: `${SERVER_ENDPOINT}/mocks/user.json`,
  MAPS: {
    'home-map': `${SERVER_ENDPOINT}/mocks/home-map.json`
  }
}
