import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const SideBar = () => {
    const { authUser } = useAuth();
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchUser, setSearchUser] = useState([]);
    const [chatUser, setChatUser] = useState([]);
    const [selectUserId, setSelectUserId] = useState(null);

    useEffect(() => {
        const chatUserHandler = async () => {
            setLoading(true)
            try {
                const chatters = await axios.get("api/user/currentchatters")
                const data = chatters.data;
                if (data.success === false) {
                    setLoading(false)
                    console.log(data.message);
                }
                setLoading(false)
                setChatUser(data)
                console.log(chatUser)

            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        }
        chatUserHandler()
    }, [])


    const handleUserClick = (user) => {
          setSelectUserId(user._id);
    }


    const handleSearchSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const search = await axios.get(`api/user/search?searchs=${searchInput}`);
            const data = search.data;
            if (data.success === false) {
                setLoading(false)
                console.log(data.message);
            }
            setLoading(false);
            if (data.length === 0) {
                toast.info("User not found")
            } else {
                setSearchUser(data);
            }

        } catch (error) {
            setLoading(false)
        }

    }

    console.log(searchUser)

    return (
        <div className='h-full w-auto px-1'>
            <div className='flex justify-between gap-2 pt-2'>


                <form onSubmit={handleSearchSubmit} className="flex items-center justify-center h-10 bg-white rounded-md shadow-md overflow-hidden cursor-pointer pl-4" >
                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        type="text"
                        placeholder="Search"
                        className="w-40 h-full border-none outline-none text-sm caret-orange-600"
                    />
                    <span className="border-r h-5/12 w-0.5 bg-gray-300 mx-3"></span>

                    <button className="px-3 py-0 bg-transparent h-10 cursor-pointer transition duration-300 hover:bg-red-100">
                        <svg
                            className="w-3 text-cyan-600"
                            viewBox="0 0 512 512"
                        >
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>

                </form>
                <img src={authUser?.profilepic} className='self-center h-11 w-11 hover:scale-110 cursor-pointer' />
            </div>
            <div className="divider px-3"></div>
            {searchUser?.length > 0 ?
                (<></>) :
                (<>
                    <div className="min-h-[70%] max-h-[80%] m overflow-y-auto scrollbar ">
                        <div className='w-auto'>
                            {chatUser.length === 0 ?
                                (<>
                                    <div className='font-bold items-center flex flex-col text-xl text-yellow-500'>
                                        <h1>Why are you Alone!!🤔</h1>
                                        <h1>Search username to chat</h1>
                                    </div>

                                </>) : (<>
                                    {chatUser.map((user, index) => (
                                       <div key={user._id}>
                                            <div
                                                onClick={() => handleUserClick(user)}
                                                className={`flex gap-3 
                                                items-center rounded 
                                                p-2 py-1 cursor-pointer
                                                ${selectUserId === user?._id ? 'bg-sky-500' : ''
                                                    } `}>
                                                <div className="avatar">
                                                    <div className="w-12 rounded-full">
                                                        <img src={user.profilepic} alt='user.img' />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col flex-1'>
                                                    <p className='font-bold text-gray-950'>{user.username}</p>
                                                </div>


                                            </div>
                                            <div className='divider divide-solid px-3 h-[1px]'></div>
                                        </div>
                                    ))}

                                </>)

                            }

                        </div>
                    </div>

                </>)
            }
        </div>

    )
}

export default SideBar