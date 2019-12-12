const {Spanner} = require('@google-cloud/spanner');

const projectId = 'lab2mirinda';
const instanceId = 'lab2mirinda-spanner';
const databaseId = 'lab2mirinda-database';

const spanner = new Spanner({projectId: projectId,});
const instance = spanner.instance(instanceId);

var Users = function () {
};

Users.prototype.getAllRooms = async function () {
  const database = instance.database(databaseId);

  try {
    const query = {
      sql: 'SELECT * FROM Sensors',
    };
    let result = await database.run(query);
    if (result[0]) {
      var rows = result[0].map((row) => row.toJSON());
      console.log('return rows');
      return rows;
    } else {
      console.log('return null');
      return null
    }
  } catch (err) {
    console.log(err);
    throw("error in getAllRooms function", err)
  }
};

Users.prototype.addRoom = async function (room) {
  const database = instance.database(databaseId);
  const roomTable = database.table('Sensors');

  try {
    await roomTable.insert([
      {
        id: Math.floor(Math.random() * Math.floor(10000)),
        name: room.name,
        roomsorcorridor: room.roomsorcorridor,
        notificationparameters: room.notificationparameters,
        systemnotifications: room.systemnotifications,
        sensorparameters: room.sensorparameters,
        sensornotifications: room.sensornotifications
      }
    ]);

    console.log('Inserted data.');
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await database.close();
  }
};

module.exports = Users;