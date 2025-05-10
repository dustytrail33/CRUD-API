import { v4 as uuidv4 } from 'uuid';

const USERS = [
  { id: uuidv4(), username: 'Alice', age: 25, hobbies: ['reading', 'traveling'] },
  { id: uuidv4(), username: 'Bob', age: 30, hobbies: ['singing'] },
  { id: uuidv4(), username: 'Charlie', age: 22, hobbies: ['gaming', 'coding'] },
  { id: uuidv4(), username: 'Diana', age: 28, hobbies: ['yoga', 'drawing'] },
  { id: uuidv4(), username: 'Eve', age: 26, hobbies: ['photography', 'writing'] },
  { id: uuidv4(), username: 'Frank', age: 32, hobbies: ['cycling', 'gardening'] },
  { id: uuidv4(), username: 'Grace', age: 24, hobbies: ['dancing'] },
  { id: uuidv4(), username: 'Hank', age: 29, hobbies: ['woodworking', 'movies'] },
  { id: uuidv4(), username: 'Ivy', age: 27, hobbies: ['baking', 'knitting'] },
  { id: uuidv4(), username: 'Jack', age: 31, hobbies: ['fishing', 'guitar'] },
];

export default USERS;
