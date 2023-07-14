import {NavLink} from "react-router-dom";
import {BiBulb, BiHeadphone} from "react-icons/bi";
import logo from "../../assets/logo.png"
import {AiFillHome} from "react-icons/ai";
import {BsGear} from "react-icons/bs";
import {FaHandshake, FaUser, FaUserTie} from "react-icons/fa";
import {SiSuperuser} from "react-icons/si";
import {GiCompanionCube, GiHouse} from "react-icons/gi";
import style from './css/Dashboard.module.css'
import {useLocation} from 'react-router-dom';
import {useState} from "react";

function CoordinatorSideNav() {
    const [link, setLink] = useState(useLocation().pathname)
    console.log(link)

    return <section className={"side-nav-md"}>
        <ul>
            <li><NavLink className={`nav-link ${link.startsWith('/coordinator/dashboard') ? style.active : ''}`}
                         to={"/coordinator/dashboard"}> <span className={"side-icon"}><AiFillHome
                fontSize={20}/></span>Home</NavLink>
            </li>
            <li><NavLink className={`nav-link ${link.startsWith('/coordinator/internships') ? style.active : ''}`}
                         to={"/coordinator/internships/menu"}>
                <span className={"side-icon"}><BsGear fontSize={20}/></span>Profile</NavLink>
            </li>
            <li><NavLink className={`nav-link ${link.startsWith('/coordinator/students') ? style.active : ''}`}
                         to={"/coordinator/students/menu"}> <span
                className={"side-icon"}><FaUser fontSize={20}/></span>Requests</NavLink>
            </li>
        </ul>
    </section>;
}

export default CoordinatorSideNav