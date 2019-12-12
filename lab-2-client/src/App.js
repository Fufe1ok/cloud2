import './App.scss';

import React, {Component} from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const apiAddress = 'https://backend-dot-lab2mirinda.appspot.com';


class App extends Component {
  state = {
    data: [],
    id: 0,
    roomData: {
      roomsorcorridor: '',
      notificationparameters: '',
      systemnotifications: '',
      sensorparameters: '',
      sensornotifications: '',
      name: ''
    },
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

  componentDidMount() {
    this.getDataFromDb();
    // if (!this.state.intervalIsSet) {
    //   let interval = setInterval(this.getDataFromDb, 1000);
    //   this.setState({ intervalIsSet: interval });
    // }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({intervalIsSet: null});
    }
  }

  getDataFromDb = () => {
    fetch(`${apiAddress}/api/getRooms`)
      .then((data) => data.json())
      .then((res) => this.setState({data: res.data}));
  };

  putDataToDB = (roomData) => {
    let currentIds = this.state.data.map((data) => data.id);
    // let idToBeAdded = 0;
    // while (currentIds.includes(idToBeAdded)) {
      // ++idToBeAdded;
    // }

    axios.post(`${apiAddress}/api/putRoom`, {
      // id: idToBeAdded,
      roomData: roomData,
    });
  };

  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete(`${apiAddress}/api/deleteRoom`, {
      data: {
        id: objIdToDelete,
      },
    });
  };

  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post(`${apiAddress}/api/updateRoom`, {
      id: objIdToUpdate,
      update: {message: updateToApply},
    });
  };

  render() {
    const {data} = this.state;
    return (
      <div className='main-container'>
        <Paper className='root'>
          <Table className='table'>
            <TableHead>
              <TableRow>
                <TableCell>Sensor Name</TableCell>
                <TableCell align="right">Room or Corridor</TableCell>
                <TableCell align="right">Notification Parameters</TableCell>
                <TableCell align="right">System Notifications</TableCell>
                <TableCell align="right">Sensor Parameters</TableCell>
                <TableCell align="right">Sensor Notifications</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length <= 0
                ? ''
                : data.map(room => (
                  <TableRow key={room.room_id}>
                    <TableCell component="th" scope="row">{room.name}</TableCell>
                    <TableCell align="right">{room.roomsorcorridor}</TableCell>
                    <TableCell align="right">{room.notificationparameters}</TableCell>
                    <TableCell align="right">{room.systemnotifications}</TableCell>
                    <TableCell align="right">{room.sensorparameters}</TableCell>
                    <TableCell align="right">{room.sensornotifications}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>

        <div className='input-fields-container'>
          <input
            className='input-field form-control'
            type="text"
            onChange={(e) => this.setState({roomData: {...this.state.roomData, name: e.target.value}})}
            placeholder="Sensor Name"
            style={{width: '200px'}}/>

          <input
            className='input-field form-control'
            type="text"
            onChange={(e) => this.setState({roomData: {...this.state.roomData, roomsorcorridor: e.target.value}})}
            placeholder="Room or Corridor"
            style={{width: '200px'}}/>

          <input
            className='input-field form-control'
            type="text"
            onChange={(e) => this.setState({roomData: {...this.state.roomData, notificationparameters: e.target.value}})}
            placeholder="NotificationParameters"
            style={{width: '200px'}}/>

          <input
            className='input-field form-control'
            type="text"
            onChange={(e) => this.setState({roomData: {...this.state.roomData, systemnotifications: e.target.value}})}
            placeholder="SystemNotifications"
            style={{width: '200px'}}/>

          <input
            className='input-field form-control'
            type="text"
            onChange={(e) => this.setState({roomData: {...this.state.roomData, sensorparameters: e.target.value}})}
            placeholder="SensorParameters"
            style={{width: '200px'}}/>

          <input
            className='input-field form-control'
            type="text"
            onChange={(e) => this.setState({roomData: {...this.state.roomData, sensornotifications: e.target.value}})}
            placeholder="SensorNotifications"
            style={{width: '200px'}}/>

          <button
            type="button"
            className="btn btn-primary send-data-button"
            onClick={() => this.putDataToDB(this.state.roomData)}>
            ADD
          </button>
        </div>
      </div>
    );
  }
}

export default App;