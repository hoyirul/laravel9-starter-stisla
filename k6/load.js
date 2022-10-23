import http from 'k6/http';
import { check, group, sleep } from 'k6';

const BASE_URL = 'http://localhost:8000'

export const options = {
  stages: [
    { duration: '5s', target: 10 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '3s', target: 10 }, // stay at 100 users for 10 minutes
    { duration: '5s', target: 0 }, // ramp-down to 0 users
  ],
//   thresholds: {
//     'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
//     'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
//   },
};

export default function () {
  const url = BASE_URL + '/login';
  const payload = JSON.stringify({
    email: 'superadmin@gmail.com',
    password: 'password',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const loginRes = http.post(url, payload, params);
  
  check(loginRes, {
    'logged in successfully': (resp) => resp.json('token') !== 400,
  });

  sleep(1);

  const userListCheck = http.get(BASE_URL + '/user-management/user');
  
  check(userListCheck, {
    'user list checked': (resp) => resp.json('token') !== 400,
  });

  sleep(1);

  const logoutCheck = http.post(BASE_URL + '/logout', params);
  
  check(logoutCheck, {
    'Logout checked': (resp) => resp.json('token') !== 400,
  });

  sleep(1);

  console.log(loginRes.body.includes('token'))
}