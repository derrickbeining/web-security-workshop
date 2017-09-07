# auther

After cloning or downloading, don't forget to install with `npm install`

Once you've ensured that `postgres` is running (e.g. by trying to start a `psql` shell), make sure you have the appropriate database. You can either run `npm run db-init` or `createdb auther`. Once you are sure you have the database, you can execute `npm run seed` to seed the database with fake data.

Finally, fire it up with `npm start-dev` and go to http://127.0.0.1:8080/.
