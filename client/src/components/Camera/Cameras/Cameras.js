import React, {useCallback, useEffect, useState} from 'react';
import { CameraItem } from './CameraItem';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/message.hook';

export const Cameras = (props) => {
  const {setCurrentCamera} = props;
  const {loading, error, request, clearError} = useHttp();
  const message = useMessage();
  const [values, setValues] = useState(null);
  const [isInitialized, setInitialized] = useState(false);
  const [form, setForm] = useState({cameraName: '',});

  useEffect( () => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect( async () => {
    if (!isInitialized)
      try {
        const data = await request("/api/camera?cameraName=", "GET");
        const newValues = data.map(v => <CameraItem camera={v} setCurrentCamera={setCurrentCamera}/>);
        setValues(newValues);
        setInitialized(true);
      } catch (e) {
        message(e.message);
        console.log("Error: ", e.message);
      }
  }, [request, setValues, message]);

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const searchHandler = async () => {
    try {
      const data = await request("/api/camera?cameraName=" + form.cameraName, "GET");
      const newValues = data.map(v => <CameraItem camera={v} setCurrentCamera={setCurrentCamera}/>)
      setValues(newValues);
    } catch (e) {
      message(e.message);
      console.log("Error: ", e.message);
    }
  }

  return (
    <div>
      <h2>Камеры</h2>
      
        <div className="row valign-wrapper left-align">
            <div className="input-field col s8" style={{marginLeft: "10px"}}>
                <input placeholder="Название камеры" name="cameraName" onChange={changeHandler} id="cameras_search" type="text" className="validate" />
            </div>
            <button className="btn col offset-s1 s2" onClick={searchHandler}>Поиск</button>
        </div>
      
      <div className="collection">
        {values}
      </div>

    </div>
  );

}