import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from '@auth0/auth0-react'
import { LogoutUser } from "../../redux/userAuth";
import { FiLogOut } from "react-icons/fi";
import Modal from "./Modal";
import { RootState } from "../../redux/store";

interface navigationType {
  name: string
  href: string
  authCheck: boolean
}
const navigation: navigationType[] = [
  { name: "HOME", href: "/", authCheck: false },
  { name: "SHOP", href: "/", authCheck: false },
  { name: "CART", href: "/cart", authCheck: true },
];

const menuNavigations: navigationType[] = [
  { name: "Your Profile", href: "/", authCheck: true },
  { name: "Order History", href: "/orders", authCheck: true },
  { name: "Customer support", href: "/chat", authCheck: true },
  { name: "Admin Login", href: "/portal", authCheck: false },

]
const modalData = {
  text: "Do you really want to Logout from this account? ",
  action: "Log Out"
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  // const { user } = useAuth0()
  const { logout, loginWithRedirect } = useAuth0()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  // const dispatch = useDispatch()
  const { userData } = useSelector((state: RootState) => state.userAuth)

  const handleNavigation = (item: navigationType) => {
    
    if (item.authCheck) {
      if (userData !== null) {
        navigate(item.href)
      } else {
        loginWithRedirect()
      }
    } else {
      navigate(item.href)
    }
  }

  const handleLogout = () => {
    setIsModalOpen(true)
  }

  const handleAction = () => {
    logout()
    dispatch(LogoutUser({ userData: null }))
  }

  return (
    <Disclosure as="nav" className="bg-white sticky top-1 z-10 ">
      {({ open }) => (
        <>
          <div className="">
            <div className="mx-auto lg:h-20 max-w-full  bg-black  mr-1 ml-1 lg:px-8 border-2 border-black mt-1">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none    ">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://media.licdn.com/dms/image/C510BAQHdiY0P2Dv1oA/company-logo_200_200/0/1630628090078/netstratum_logo?e=1730332800&v=beta&t=yXsl-Z3KFwLxnLpxdiv-1l8D264Tv67_PJWUoedSyzk"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <div
                          key={item.name}
                          onClick={() => handleNavigation(item)}
                          className={classNames(
                            // item.current? "bg-gray-900 text-white":
                            "text-white hover:bg-gray-700 hover:text-white cursor-pointer",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}

                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={userData ? userData.picture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGlZkIqki43f4vMGa-DljqZBCOr6D6Cm_l_kDM06YEjL2QWlKZY_glSuSJGybsUIHmdpc&usqp=CAU"}
                          alt={userData?.email}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >

                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {menuNavigations.map((item,i) => (
                          <Menu.Item key={i}>
                            {({ active }) => (
                              <div key={i} onClick={()=>handleNavigation(item)}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </div>
                            )}
                          </Menu.Item>
                        ))}
                       
                        
                        
                        {userData ? (
                          <Menu.Item>
                            {({ active }) => (
                              <h6 onClick={handleLogout}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Logout
                              </h6>
                            )}
                          </Menu.Item>
                        ) : (
                          <Menu.Item>
                            {({ active }) => (
                              <h6 onClick={() => loginWithRedirect()}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Login
                              </h6>
                            )}
                          </Menu.Item>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  onClick={() => handleNavigation(item)}
                  className={classNames(
                    // item.current? "bg-gray-900 text-white":
                    "text-gray-800 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
          {isModalOpen && (

            <Modal setIsModalOpen={setIsModalOpen} handleAction={handleAction} modalData={modalData} icon={<FiLogOut size={40} color="red" />} />
          )}
        </>
      )}
    </Disclosure>
  );
}