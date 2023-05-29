# Book Management System
## Technologies used:
  Frontend: React JS, redux, JEST, React Testing Library, GraphQL, Apollo Client <br>
  Backend: Node JS, Express JS, GraphQL, Apollo Client, MySQL, Prisma <br>


## SnapShots:

<img width="1379" alt="image" src="https://github.com/laxmanaileni/Book/assets/59108427/4a6ed969-0609-4c7d-804b-9abba3f84bc8">

Add New Book

<img width="1374" alt="image" src="https://github.com/laxmanaileni/Book/assets/59108427/1bd83b42-3f91-48c0-a57d-59a0518fe2e3">

Edit Book

<img width="1372" alt="image" src="https://github.com/laxmanaileni/Book/assets/59108427/b01e19ee-58cb-4859-b6b9-f2d4ee0001cc">

Not Found

<img width="1376" alt="image" src="https://github.com/laxmanaileni/Book/assets/59108427/fc0714e4-6262-422c-8cde-74b62676ada8">


## Frontend Setup:
<ul>
  <li>
      Download the project and open the “Frontend” folder using VS Code. Open the terminal and install all the dependencies. 
  </li>
  <li>
       Dependencies:<br>
       npm install react-router-dom react-redux @reduxjs/toolkit @apollo/client graphql @testing-library/react @testing-library/jest-dom jest
</li>
  <li>
        Type “npm start” which should start the server at “localhost:3000”.
    </li>
  <li>
	      Type “npm run test” to run the test cases.
    </li>
</ul>

## Backend Setup:
<ul>
  <li>
	Download the project and open the “Backend” folder using VS Code. Open the terminal and install all the dependencies. 
  </li>
  <li>
	Dependencies: <br>
npm install express apollo-server-express @prisma/client graphql jest @types/node apollo-server-testing prisma supertest ts-node typescript
  </li>
      <li>	Setup the MySQL database connection:
<ul><li>	Install MySQL Workbench and follow this link for future references (https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/).</li>
<li>After setup, create a MySQL Connection, give connection name, username, password and create a connection. </li>
<li>Create a Schema and user for this connection (reference: https://dev.mysql.com/doc/workbench/en/wb-mysql-connections-new.html).</li></ul>
<li>	Create a “.env” file and write DATABASE_URL="mysql://username:password@localhost:3306/dbname"</li>
  <li>	Setup Prisma ORM:</li>
  <ul><li>
Install all dependencies of Prisma npm install prisma typescript ts-node @types/node --save-dev</li>
    <li>
	Type “npx prisma init” in the terminal to create the Prisma Schema (reference: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-mysql).
    </li></ul>
  <li>
      	Type “npm start” which should start the server at “localhost:4000/graphql”.
    </li>
  <li>
Type “jest” to run test cases in backend.
    </li>
<hr>
 
  
