import React from "react";
import {Link} from "react-router-dom";

export default function NavBar(){
    return(
        <nav>
            <div>
                <Link to="/home">
                    <h1>Home</h1>
                </Link>
            </div>
            <div>
                <Link to="/create">
                    <h1>Create</h1>
                </Link>
            </div>
        </nav>
    )
}