'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Correct import
import React, { useEffect, useState } from 'react';
import { checkTokenValidity } from '../components/utils/checkTokenValidity';
import { HiH1 } from 'react-icons/hi2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeLowVision } from '@fortawesome/free-solid-svg-icons';
import { faEye } from "@fortawesome/free-regular-svg-icons";

export default function Page() {
  const [newPassword, setNewPassword] = useState({
    oldPassword: "",
    newPassword:"",
    repeatNewPassword:''
  })
  const [passwordVisible, setPassowrdVisible] = useState(true)
  const [hidden, setHidden] = useState(true)
  const toggleHiddenVisible = (id:string)=> {
    setHidden(!hidden)
  }
  const togglePasswordVisible = ()=>{
    setPassowrdVisible(!passwordVisible)
  }
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const [passwordError,setPasswordError] = useState<string>('')
  const [userData, setUserData] = useState({ userName: '', email: '', mobileNumber: "",
    password: "" });
  const [error, setError] = useState('');
  const router = useRouter();
  const [isFirstButtonActive, setIsFirstButtonActive] = useState(true);

  const logOut = () => {
    localStorage.removeItem('token');
    router.push('/'); // Redirect to home after logout
  };
  const newPasswordValue = (name: string, value: string) => {
    // Update the newPassword state dynamically based on the name
    setNewPassword((prevState) => {
      const updatedState = { ...prevState, [name]: value };
  
      // Check if the newPassword and repeatNewPassword match
      if (updatedState.newPassword !== updatedState.repeatNewPassword) {
        setPasswordError('ახალი პაროლები არ ემთხვევა ერთმანეთს'); // Passwords don't match
      }else if(!passwordRegex.test(updatedState.newPassword)){
        setPasswordError('პაროლი უნდა შეიცავდეს მცირე და დიდ ასოებს, ციფრებს და სპეციალურ სიმბოლოებს.');

      } else {
        setPasswordError(''); // Passwords match
      }
  
      return updatedState;
    });
  
    console.log(name, value); // Logging for debugging purposes
  };
  const updatetPassword = ()=>{
    const token = localStorage.getItem('token');
    if (!token || checkTokenValidity(token) !== true) {
      router.push('/login');
      return;
    }
    const [answer, setAnswer] = useState('')
    axios.patch('http://localhost:3001/auth/edit ',
      {
        
        password: newPassword.newPassword,
        repeatNewPassword: newPassword.repeatNewPassword,
      },
      {headers: { Authorization: `Bearer ${token}` },}
    ).then(()=>{
      setAnswer('პაროლი წარმატებით შეიცვალა')
      setTimeout(() => {
        setAnswer('')
      }, 3000)
    }).catch((err)=>{
      setAnswer(err)
    })
  }
  
    
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token || checkTokenValidity(token) !== true) {
      router.push('/login');
      return;
    }

    axios
      .get('http://localhost:3001/auth/account', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
         setUserData({
          userName: res.data.username,
          email: res.data.email,
          mobileNumber: res.data.mobileNumber,
          password: res.data.password
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [router]); // Add router to the dependency array
  const [isEditing, setIsEditing] = useState(false);
  const handleSave = () => {
    setIsEditing(false); // Switch back to view mode
    // You can also add logic to save the updated phone number here
  };
  const changePassword = ()=> {
    const token = localStorage.getItem('token');

    if (!token || checkTokenValidity(token) !== true) {
      router.push('/login');
      return;
    }
    axios.patch('http://localhost:3001/auth/edit ', { // Body: Data to be updated
      change: 'password', 
      changeTo: ''
    },{
      
      headers: {Authorization: `Bearer ${token}`},
    }).then((res)=>{
      password: res.data.password

    })
  }
  
  return (
    <div>
      {error ? (
        <div>
          <h1>Error: {error}</h1>
        </div>
      ) : (
        <div>
          <div className='flex font-bold  text-[25px] xl:ml-[13rem] justify-start mt-[1rem] ml-[1rem] '>
            <h1 >გამარჯობა, {userData.userName}</h1>
          </div>
          <div className='flex flex-col items-start md:flex-row ml-[2rem]'>
          <div>
            <ul className=' mt-[2rem] flex flex-col gap-6 xl:mt-[4rem] xl:ml-[13rem]'>
            <li className='flex items-center gap-4  cursor-pointer'>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.416 12.5693C11.7967 12.5693 12.916 11.45 12.916 10.0693C12.916 8.68862 11.7967 7.56934 10.416 7.56934C9.0353 7.56934 7.91602 8.68862 7.91602 10.0693C7.91602 11.45 9.0353 12.5693 10.416 12.5693Z" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.5833 12.57C16.4724 12.8213 16.4393 13.1001 16.4883 13.3705C16.5373 13.6408 16.6662 13.8903 16.8583 14.0867L16.9083 14.1367C17.0633 14.2914 17.1862 14.4753 17.2701 14.6776C17.354 14.8799 17.3971 15.0968 17.3971 15.3158C17.3971 15.5348 17.354 15.7517 17.2701 15.9541C17.1862 16.1564 17.0633 16.3402 16.9083 16.495C16.7535 16.6499 16.5697 16.7729 16.3674 16.8568C16.1651 16.9406 15.9482 16.9838 15.7292 16.9838C15.5101 16.9838 15.2933 16.9406 15.0909 16.8568C14.8886 16.7729 14.7048 16.6499 14.55 16.495L14.5 16.445C14.3036 16.2529 14.0542 16.124 13.7838 16.075C13.5135 16.026 13.2347 16.0591 12.9833 16.17C12.7369 16.2756 12.5267 16.451 12.3786 16.6746C12.2305 16.8982 12.1511 17.1602 12.15 17.4283V17.57C12.15 18.012 11.9744 18.4359 11.6618 18.7485C11.3493 19.0611 10.9254 19.2367 10.4833 19.2367C10.0413 19.2367 9.61738 19.0611 9.30482 18.7485C8.99226 18.4359 8.81667 18.012 8.81667 17.57V17.495C8.81022 17.2192 8.72093 16.9517 8.56043 16.7272C8.39992 16.5028 8.17561 16.3319 7.91667 16.2367C7.66532 16.1257 7.38651 16.0926 7.11618 16.1417C6.84585 16.1907 6.5964 16.3195 6.4 16.5117L6.35 16.5617C6.19521 16.7166 6.0114 16.8395 5.80907 16.9234C5.60674 17.0073 5.38986 17.0505 5.17083 17.0505C4.95181 17.0505 4.73493 17.0073 4.5326 16.9234C4.33027 16.8395 4.14646 16.7166 3.99167 16.5617C3.83671 16.4069 3.71377 16.2231 3.6299 16.0207C3.54603 15.8184 3.50286 15.6015 3.50286 15.3825C3.50286 15.1635 3.54603 14.9466 3.6299 14.7443C3.71377 14.5419 3.83671 14.3581 3.99167 14.2033L4.04167 14.1533C4.23378 13.9569 4.36265 13.7075 4.41167 13.4371C4.46069 13.1668 4.4276 12.888 4.31667 12.6367C4.21103 12.3902 4.03563 12.18 3.81205 12.0319C3.58848 11.8838 3.32649 11.8044 3.05833 11.8033H2.91667C2.47464 11.8033 2.05072 11.6277 1.73816 11.3152C1.42559 11.0026 1.25 10.5787 1.25 10.1367C1.25 9.69463 1.42559 9.2707 1.73816 8.95814C2.05072 8.64558 2.47464 8.46999 2.91667 8.46999H2.99167C3.2675 8.46354 3.535 8.37425 3.75942 8.21375C3.98383 8.05324 4.15476 7.82893 4.25 7.56999C4.36093 7.31864 4.39402 7.03983 4.345 6.7695C4.29599 6.49917 4.16711 6.24972 3.975 6.05332L3.925 6.00332C3.77004 5.84853 3.64711 5.66472 3.56323 5.46239C3.47936 5.26006 3.43619 5.04318 3.43619 4.82415C3.43619 4.60513 3.47936 4.38825 3.56323 4.18592C3.64711 3.98359 3.77004 3.79978 3.925 3.64499C4.07979 3.49003 4.2636 3.36709 4.46593 3.28322C4.66826 3.19935 4.88514 3.15618 5.10417 3.15618C5.32319 3.15618 5.54007 3.19935 5.7424 3.28322C5.94473 3.36709 6.12855 3.49003 6.28333 3.64499L6.33333 3.69499C6.52973 3.8871 6.77918 4.01598 7.04951 4.06499C7.31984 4.11401 7.59865 4.08092 7.85 3.96999H7.91667C8.16314 3.86435 8.37335 3.68895 8.52141 3.46537C8.66947 3.2418 8.74893 2.97981 8.75 2.71165V2.56999C8.75 2.12796 8.9256 1.70404 9.23816 1.39148C9.55072 1.07892 9.97464 0.90332 10.4167 0.90332C10.8587 0.90332 11.2826 1.07892 11.5952 1.39148C11.9077 1.70404 12.0833 2.12796 12.0833 2.56999V2.64499C12.0844 2.91314 12.1639 3.17513 12.3119 3.39871C12.46 3.62228 12.6702 3.79768 12.9167 3.90332C13.168 4.01425 13.4468 4.04734 13.7172 3.99832C13.9875 3.94931 14.2369 3.82043 14.4333 3.62832L14.4833 3.57832C14.6381 3.42336 14.8219 3.30043 15.0243 3.21655C15.2266 3.13268 15.4435 3.08951 15.6625 3.08951C15.8815 3.08951 16.0984 3.13268 16.3007 3.21655C16.5031 3.30043 16.6869 3.42336 16.8417 3.57832C16.9966 3.73311 17.1196 3.91692 17.2034 4.11925C17.2873 4.32158 17.3305 4.53846 17.3305 4.75749C17.3305 4.97651 17.2873 5.19339 17.2034 5.39572C17.1196 5.59805 16.9966 5.78187 16.8417 5.93665L16.7917 5.98665C16.5996 6.18305 16.4707 6.4325 16.4217 6.70283C16.3726 6.97316 16.4057 7.25197 16.5167 7.50332V7.56999C16.6223 7.81646 16.7977 8.02667 17.0213 8.17473C17.2449 8.32279 17.5068 8.40225 17.775 8.40332H17.9167C18.3587 8.40332 18.7826 8.57892 19.0952 8.89148C19.4077 9.20404 19.5833 9.62796 19.5833 10.07C19.5833 10.512 19.4077 10.9359 19.0952 11.2485C18.7826 11.5611 18.3587 11.7367 17.9167 11.7367H17.8417C17.5735 11.7377 17.3115 11.8172 17.0879 11.9652C16.8644 12.1133 16.689 12.3235 16.5833 12.57V12.57Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                პარამეტრები</li>
                <hr className='w-[200px]' />
              <li className='flex items-center gap-4 cursor-pointer'>
              <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.957 7.42168L5.45703 3.09668" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round"></path><path d="M16.707 12.9218V6.25513C16.7067 5.96286 16.6296 5.6758 16.4833 5.42276C16.337 5.16972 16.1268 4.9596 15.8737 4.81346L10.0404 1.48013C9.787 1.33385 9.49959 1.25684 9.20703 1.25684C8.91447 1.25684 8.62706 1.33385 8.3737 1.48013L2.54036 4.81346C2.28725 4.9596 2.07701 5.16972 1.93075 5.42276C1.78448 5.6758 1.70733 5.96286 1.70703 6.25513V12.9218C1.70733 13.2141 1.78448 13.5011 1.93075 13.7542C2.07701 14.0072 2.28725 14.2173 2.54036 14.3635L8.3737 17.6968C8.62706 17.8431 8.91447 17.9201 9.20703 17.9201C9.49959 17.9201 9.787 17.8431 10.0404 17.6968L15.8737 14.3635C16.1268 14.2173 16.337 14.0072 16.4833 13.7542C16.6296 13.5011 16.7067 13.2141 16.707 12.9218Z" stroke="currentColor" strokeWidth="1.71591" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1.93164 5.38867L9.20664 9.59701L16.4816 5.38867" stroke="currentColor" strokeWidth="1.71591" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.20898 17.9879V9.58789" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round"></path></svg>
                შეკვეთები
                </li>
                <hr className='w-[200px]' />
              <li className='flex items-center gap-4 cursor-pointer'>
              <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5812 1.16992H2.94484C2.10804 1.16992 1.42969 1.85393 1.42969 2.6977V11.8644C1.42969 12.7081 2.10804 13.3921 2.94484 13.3921H16.5812C17.418 13.3921 18.0964 12.7081 18.0964 11.8644V2.6977C18.0964 1.85393 17.418 1.16992 16.5812 1.16992Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1.42969 5.61426H18.0964" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round"></path></svg>
                ჩემი ბარათები
                </li>
                <hr className='w-[200px]' />

              <li className='flex items-center gap-4 cursor-pointer'>
              <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.707 8.43652C16.707 14.2699 9.20703 19.2699 9.20703 19.2699C9.20703 19.2699 1.70703 14.2699 1.70703 8.43652C1.70703 6.4474 2.49721 4.53975 3.90373 3.13322C5.31025 1.7267 7.21791 0.936523 9.20703 0.936523C11.1962 0.936523 13.1038 1.7267 14.5103 3.13322C15.9169 4.53975 16.707 6.4474 16.707 8.43652Z" stroke="currentColor"  strokeLinejoin="round"></path><path d="M9.20898 10.9365C10.5897 10.9365 11.709 9.81724 11.709 8.43652C11.709 7.05581 10.5897 5.93652 9.20898 5.93652C7.82827 5.93652 6.70898 7.05581 6.70898 8.43652C6.70898 9.81724 7.82827 10.9365 9.20898 10.9365Z" stroke="currentColor"  strokeLinejoin="round"></path></svg>
                მისამართები
                </li>
                <hr className='w-[200px]' />

             

              <li onClick={logOut} className='cursor-pointer gap-4 flex items-center'>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 16.3613H3.16667C2.72464 16.3613 2.30072 16.1857 1.98816 15.8732C1.67559 15.5606 1.5 15.1367 1.5 14.6947V3.02799C1.5 2.58597 1.67559 2.16204 1.98816 1.84948C2.30072 1.53692 2.72464 1.36133 3.16667 1.36133H6.5" stroke="currentColor"   strokeLinejoin="round"></path><path d="M12.334 13.0296L16.5007 8.86296L12.334 4.69629" stroke="currentColor"   strokeLinejoin="round"></path><path d="M16.5 8.8623H6.5" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round"></path></svg>
                გამოსვლა</li>
                <hr className='w-[200px]' />



            </ul>
          </div>
          <div className='md:mt-[2rem] w-full flex flex-col gap-7 md:ml-[5rem]'>
            <div >
            <h2 className='font-bold text-[20px]'>პარამეტრები</h2>
           
            <div className='flex flex-col md:flex-row max-w-max gap-2 '>
            <button onClick={()=> setIsFirstButtonActive(true)} className={`border p-3 rounded-2xl ${
              isFirstButtonActive ? "bg-blue-500":"bg-white"
            }`}>პირადი ინფორმაცია</button>
            <button 
            onClick={()=> setIsFirstButtonActive(false)}
            // className='border bg-blue-600 p-3 rounded-2xl'
            className={`border p-3 rounded-2xl ${!isFirstButtonActive? "bg-blue-500": "bg-white"} ` }
            >
               პაროლის შეცვლა</button>
               
            </div>
            {isFirstButtonActive ? 
       <>
       <div>

       </div>
       <div className='flex justify-between mt-[2rem]   items-center'>
          <div>
            <h3>მეილი</h3>
            <h4 className='text-[13px] mt-[0.5rem] '>{userData.email}</h4>
          </div>
          <div>
            <h4 className='text-blue-500 cursor-pointer  items-center xl:mr-[20rem] mr-[2rem] '
            >შეცვლა</h4>
          </div>


        </div>
        <hr className='w-[270px] mt-[1rem] mb-[1rem] md:w-[450px] lg:w-[700px] xl:w-[800px] ' />

        <div className='flex  justify-between items-center'>
            <div>
              <h2 className='text-[15px]'>სახელი,გვარი</h2>
              <h2 className='text-[13px] mt-[0.5rem]'>{userData.userName}</h2>
            </div>

            <div>
              <h3 className='text-blue-500  cursor-pointer xl:mr-[20rem] mr-[2rem] '>შეცვლა</h3>
            </div> 

          </div>
          <hr className='w-[270px] mt-[1rem] mb-[1rem] md:w-[450px] lg:w-[700px] xl:w-[800px] ' />
          <div className='flex  justify-between  items-center'>
            <div>
              <h3>მობილურის ნომერი</h3>
              <h4 className='mt-[0.5rem]'>{userData.mobileNumber}</h4>
            </div>
            <div>
              <h4 className='text-blue-500 cursor-pointer xl:mr-[20rem] mr-[2rem] '>შეცვლა</h4>

            </div>

          </div><hr className='w-[270px] mt-[1rem] mb-[1rem] md:w-[450px] lg:w-[700px] xl:w-[800px] ' /></>
      :    <div className='flex  md:justify-between items-center'>
      <div>
        <div className='mt-[1rem] mb-[1rem]'>
        <h3>პაროლის შეცვლა</h3>

        </div>
        <div>
          <form  className='flex flex-col gap-6' >
          <div className="flex items-center border-solid rounded-xl border-2 border-[#D0D5DD] px-[10px] py-[10px] w-full sm:w-[396px] mt-[3px]">
              <input
                className="flex-1 outline-none"
                onChange={(e) => newPasswordValue(e.target.name, e.target.value)}
                name="oldPassword"
                placeholder="ძველი პაროლი"
                type={passwordVisible ? 'password' : 'text  '}
                id=""
              />
             {
        passwordVisible ? (
          <FontAwesomeIcon
          onClick={()=>togglePasswordVisible((e:any)=> e.target.id)} // On click, toggle password visibility
          // On click, toggle password visibility
            icon={faEyeLowVision} // "Eye" icon when password is visible
            className="ml-2 text-gray-500 cursor-pointer"
            id='oldPassword'
          />
        ) : (
          <FontAwesomeIcon
            onClick={()=>togglePasswordVisible((e:any)=> e.target.id)} // On click, toggle password visibility
            icon={faEye} // "Eye-slash" icon when password is hidden
            className="ml-2 text-gray-500 cursor-pointer"
            id='oldPassword'
          />
        )
      }
            </div>

                        

            <div className="flex items-center border-solid rounded-xl border-2 border-[#D0D5DD] px-[10px] py-[10px] w-full sm:w-[396px] mt-[3px]">
              <input
                className="flex-1 outline-none"
                onChange={(e) => newPasswordValue(e.target.name, e.target.value)}
                name="newPassword"
                placeholder="ახალი პაროლი"
                type={passwordVisible ? 'password' : 'text  '}


                id=""
              />
           {
        passwordVisible ? (
          <FontAwesomeIcon
            onClick={togglePasswordVisible} // On click, toggle password visibility
            icon={faEyeLowVision} // "Eye" icon when password is visible
            className="ml-2 text-gray-500 cursor-pointer"
          />
        ) : (
          <FontAwesomeIcon
            onClick={togglePasswordVisible} // On click, toggle password visibility
            icon={faEye} // "Eye-slash" icon when password is hidden
            className="ml-2 text-gray-500 cursor-pointer"
          />
        )
      }
            
             

            </div>

            <div className="flex items-center border-solid rounded-xl border-2 border-[#D0D5DD] px-[10px] py-[10px] w-full sm:w-[396px] mt-[3px]">
                <input
                  className="flex-1 outline-none"
                  name="repeatNewPassword"
                  onChange={(e) => newPasswordValue(e.target.name, e.target.value)}
                  placeholder="გაიმეორეთ ახალი პაროლი"
                  type={passwordVisible ? 'password' : 'text  '}


                  id=""
                />
               {
        passwordVisible ? (
          <FontAwesomeIcon
            onClick={togglePasswordVisible} // On click, toggle password visibility
            icon={faEyeLowVision} // "Eye" icon when password is visible
            className="ml-2 text-gray-500 cursor-pointer"
          />
        ) : (
          <FontAwesomeIcon
            onClick={togglePasswordVisible} // On click, toggle password visibility
            icon={faEye} // "Eye-slash" icon when password is hidden
            className="ml-2 text-gray-500 cursor-pointer"
          />
        )
      }
              </div>


            <p>{passwordError}</p>
            <button 
            className='border bg-black text-white p-3 rounded-lg max-w-max' 
            // onClick={}
            type="submit">
          
              განაახლე პაროლი
              </button>

          </form>
        </div>
      
      </div>
      {/* <div>
      <h4 className='text-blue-500 cursor-pointer xl:mr-[20rem] mr-[2rem] '>შეცვლა</h4>

      </div> */}
      
    </div> }
            

            </div>
           
        
          </div>
          </div>
          
          
        </div>
      )}
     
     
    </div>
  );
}
