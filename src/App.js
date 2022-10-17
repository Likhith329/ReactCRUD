import './index.css';
import { useState } from 'react';
import {Routes,Route,Link, useParams,useNavigate} from 'react-router-dom';
const users=[
  {name:"Thor",
   pic:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Chris_Hemsworth_by_Gage_Skidmore_2_%28cropped%29.jpg/330px-Chris_Hemsworth_by_Gage_Skidmore_2_%28cropped%29.jpg",
   username:"stormbreaker123",
   email:"bringmethanos@gmail.com"
  },
  {name:"Tony stark",
   pic:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg/330px-Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg",
   username:"iloveyou3000",
   email:"imironman@gmail.com"
  },
  {name:"Steve Rogers",
   pic:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Mark_Kassen%2C_Tony_C%C3%A1rdenas_and_Chris_Evans_%28cropped%29.jpg/330px-Mark_Kassen%2C_Tony_C%C3%A1rdenas_and_Chris_Evans_%28cropped%29.jpg",
   username:"icandothisalltheday",
   email:"avengersassemble@gmail.com"
  }
]

export default function App() {
  const [userlist,setUserlist]=useState(users)
 
  return (
    <div> 
     
<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <div class="container-fluid">
    <a class="navbar-brand" >App</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav">
      <li className='nav-item'>
            <Link to="/ReactCRUD" className='nav-link dashboard'>Home</Link>
          </li>
          <li className='nav-item'>
            <Link to="/Users" className='nav-link dashboard'>Users</Link>
          </li>
          <li className='nav-item'>
            <Link to="/Adduser" className='nav-link dashboard'>Add user</Link>
          </li>
      </ul>
      
    </div>
  </div>
</nav>
    
   <Routes>
    <Route path='/ReactCRUD' element={<Home/>}/>
    <Route path='/Users' element={<User userlist={userlist} setUserlist={setUserlist} />}/>
    <Route path='/Adduser' element={<Adduser userlist={userlist} setUserlist={setUserlist}/>}/>
   <Route path='/Users/:userid' element={<Updateuserdetails userlist={userlist}/>}/>
    <Route path='*' element={<PageNotFound/>}/>
   </Routes>
    </div>
   
  );
}

function User({userlist,setUserlist}){
  const navigate=useNavigate() 
  return(
    <div className='table-responsive'>
    <table className='table table-striped '>
      <thead>
        <th>S.no</th>
        <th>Profile pic</th>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
      </thead>
      <tbody>
        {userlist.map((user,index)=>(
          <tr>
            <td>{index+1}</td>
            <td><img src={user.pic} height="100px" width="100px" /></td>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>

          <td><button className='btn btn-primary' onClick={()=>{
              navigate(`/Users/${index+1}`)
          }}>Edit</button></td>

          <td><button className='btn btn-primary' onClick={()=>{
            let something=[...userlist.slice(0,index),...userlist.slice(index+1,userlist.length)]
            setUserlist(something)
          }} >Remove</button></td>

        </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}


function Adduser({userlist,setUserlist}){

  const [names,setName]=useState("")
  const [usernames,setUsername]=useState("")
  const [emails,setEmail]=useState("")
  const [profiles,setProfile]=useState("")
  const navigate=useNavigate()
  return(
    <div className='inp'>
      <input type="text" placeholder='Enter the name' onChange={(event)=>{setName(event.target.value)}} />
      <input type="text" placeholder='Enter the profile url' onChange={(event)=>{setProfile(event.target.value)}} />
      <input type="text" placeholder='Enter the username' onChange={(event)=>{setUsername(event.target.value)}}/>
      <input type="text" placeholder='Enter the email' onChange={(event)=>{setEmail(event.target.value)}} />
      <button className='btn btn-primary' onClick={()=>{
        let newInfo={
          name:names,
          pic:profiles,
          email:emails,
          username:usernames
        }
        if(names!='' && emails!='' && usernames!='' && profiles!=''){
          setUserlist([...userlist,newInfo])
          navigate("/Users")
        }
        else{
          alert("Enter all the fields")
        }
        
      }}>Add</button>
    </div>
  )
}
function Updateuserdetails({userlist}){
  const {userid}=useParams()
  const navigate=useNavigate()
  const book=userlist[userid-1]
  
  const [uppic,setUppic]=useState(book.pic)
  const [upname,setUpname]=useState(book.name)
  const [upusername,setUpusername]=useState(book.username)
  const [upemail,setUpemail]=useState(book.email)

  

 

  return(
    <div className='update'>
      <div className='profile'>Profile</div>
    <div className='input-group'>
      <div className='input-group-prepend'><span className='input-group-text'>Profile url</span></div>
    <input type="text"  value={uppic}  onChange={(event)=>{setUppic(event.target.value)}}/>  
    </div>
    <div className='input-group'>
      <div className='input-group-prepend'><span className='input-group-text'>Name</span></div>
      <input type="text" value={upname} onChange={(event)=>{setUpname(event.target.value)}}/>
    </div>
    <div className='input-group'>
      <div className='input-group-prepend'><span className='input-group-text'>Username</span></div>
      <input type="text" value={upusername} onChange={(event)=>{setUpusername(event.target.value)}}/>
    </div>
    <div className='input-group'>
      <div className='input-group-prepend'><span className='input-group-text'>Email</span></div>
      <input type="text" value={upemail} onChange={(event)=>{setUpemail(event.target.value)}}/>
    </div>
    
    
    <button className='btn btn-secondary'onClick={()=>{
      if(uppic!='' || upname!='' || upemail!='' || upusername!='')
      book.pic=uppic
      book.name=upname
      book.email=upemail
      book.username=upusername
      navigate("/Users")
    }}>Update</button>
    </div>
  )
}


function PageNotFound(){
  return(
    <div>
      <h1>the loaded page is not found</h1>
    </div>
  )
}

function Home(){
  return(
    <div className='homepage'>
      <h1>Welcome to the home page!</h1>
    </div>
  )
}