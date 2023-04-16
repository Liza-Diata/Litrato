import { useAuthContext } from "../context/AuthContext"
import { useMemo, useState } from "react"
import { Link, useLocation } from 'react-router-dom'
import { useFirestoreContext } from "../context/FirestoreContext"


const Login = () => {
    const {login, currentUser } = useAuthContext()
    return (
      !currentUser &&  
      <button type='button' className='btn btn-danger' onClick={login}>Login</button>
    )
}
const LogOut = () => {
    const {logout, currentUser } = useAuthContext()
    return (
      !!currentUser &&  
      <button type='button' className='btn btn-danger' onClick={logout}>LogOut</button>
    )
}

function Navigation() {
    const { currentUser } = useAuthContext()
    const { pathname } = useLocation()
    return (
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <Link class={`nav-link ${pathname === "/" ? "active" : ""}`} aria-current="page" to='/'>Home</Link>
            </li>
            {currentUser && (
            <li class="nav-item">           
                <Link class={`nav-link ${pathname === "/stockimages" ? "active" : ""}`}  aria-current="page" to='/stockimages'>My Stock Images</Link>
            </li>
            )}
            {currentUser && (
            <li class="nav-item">           
                <Link class={`nav-link ${pathname === "/profile" ? "active" : ""}`}  aria-current="page" to='/profile'>Profile</Link>
            </li>
            )}     
        </ul>

    )
}

function SearchForm() {
    const [text, search] =useState(null)
    const { filterItems: filter } = useFirestoreContext()
    const handleOnChange = e => {
        search(e.target.value)
        filter(e.target.value)
    }
    const handleOnSubmit = e => {
        e.preventDefault()
       filter(text)
    }
    return (
        <form class="d-flex" onSubmit={handleOnSubmit}>
            <input 
            onChange={handleOnChange}
            class="form-control me-2" 
            type="search" placeholder="Search" 
            aria-label="Search" />
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
    )
}

function Dropdowns() {
    const { currentUser } = useAuthContext()

    const username = useMemo(() => {
        return currentUser?.displayName || "Profile"
    }, [currentUser])

    const avatar = useMemo(() => {
        return !!currentUser ?
        <img className="avatar" src={currentUser?.photoURL} alt={currentUser?.displayName} width="34" height="34"/> : Login
    }, [currentUser])
    return (
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {avatar}
            </a>
            <ul class="dropdown-menu">
            <li>
            <a class="dropdown-item" href="#">
            {currentUser && <Link to="profile">{username}</Link> } 
            </a>
            <li><hr className='dropdown divider' /></li>
            </li>
            <div className='d-flex justify-content-center'>
            <Login />
            <LogOut />
            </div>
            </ul>
        </li>
    </ul>
    )
}
const Nav = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand px-5" href="#">LITRATO</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <Navigation />
            <SearchForm />
            <Dropdowns />
      </div>
    </div>
  </nav>
  )
}

export default Nav