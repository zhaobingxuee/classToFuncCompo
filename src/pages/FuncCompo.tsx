import React, { useEffect,useState,useRef } from 'react';
import request from 'umi-request';

type User = {
  name:string,
  email:string
}
type Props = {
  userId:string
}

function UserData(props:Props){
  const {userId} = props;
  const [user,setUser] = useState<User>({name:'',email:''});
  const [seconds,setSeconds] = useState(0);
  const preUserId = useRef<String>();
  const getData = async () => {
    //取值 全部根据后端返回字段
    const {success,data,msg} = await request(`https://secret.url/user/${props.userId}`, {
      method: 'GET',
    })
    //根据后端返回的状态
    if(success){
      setUser(data)
    }else{
      console.error('Error fetching user data:', msg)
    }
  }
  useEffect(() => {
    //初始渲染
    getData()
    const interId = setInterval(() => {
      setSeconds((pre) => pre+1)
    },1000)
    return clearInterval(interId)
  },[])
  useEffect(() => {
    if(preUserId.current !== userId){
      getData()
    }else{
      preUserId.current = userId;
    }
  },[userId])
  return (
      <div>
        <h1>User Data Component</h1>
        {user ? (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <p>Timer: {seconds} seconds</p>
      </div>
    );
}
export default UserData;