import http from 'k6/http';
import { check, group, sleep } from 'k6';
import encoding from 'k6/encoding';

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

const BASE_URL = 'http://localhost:8000';
const EMAIL = 'superadmin@gmail.com';
const PASSWORD = 'password';

export default () => {
  const loginRes = http.post(`${BASE_URL}/api/auth/login`, {
    email: EMAIL,
    password: PASSWORD,
    device_name: "MacOS"
  });

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('token') !== 400,
  });

  const encodedCredentials = encoding.b64encode("email:password");

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${encodedCredentials}`,
    },
  };

  // console.log(authHeaders);

  const myObjects = http.get(`${BASE_URL}/dashboard`);
  check(myObjects, { 'retrieved categories' : (obj) => obj.length > 0 });

  sleep(1);
};
