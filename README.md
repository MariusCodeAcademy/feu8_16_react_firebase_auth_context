# Steps

1. `npm install firebase`
2. firebase/firebase.js

```js
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
const firebaseConfig = {};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
```

# Praktika

## Profile page

1. Sukurti forma su displayName ir protoUrl
2. pateikiant forma paimti reiksmes is displayName ir protoUrl
3. updateProfile funkcijos pagalba atnaujinti reiksmes
   https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile

4. paduoti i konteksta (AuthProvider) displayName ir protoUrl is fireUser
5. pasiimti displayName protoUrl info is konteksto ir jas panaudoti kaip pradines reiksmes displayName ir protoUrl.
6. graziai sustilizuoti profilio puslapi, nuotrauka, display name, email

##
