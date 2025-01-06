# Social media frontend


## application structure

src/
├── components/
│   └── LoginForm.js
├── features/
│   ├── auth/
│   │   ├── authSlice.js
│   │   ├── authSaga.js
│   │   └── authApi.js
├── i18n/
│   └── index.js
├── schemas/
│   └── loginSchema.js
├── styles/
│   └── theme.js
├── pages/
│   └── LoginPage.js
├── App.js
├── index.js
└── store.js


## Generate ssl certificates

run in the terminal 
```bash
openssl req -x509 -newkey rsa:4096 -keyout certs/key.pem -out certs/cert.pem -days 365 -nodes

```