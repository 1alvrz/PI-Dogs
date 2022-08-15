import {React} from "react";
import { Link } from "react-router-dom";

export default function Landing(){
    return(
        <div>
            <div>
                <h1>Henry Dogs App</h1>
                <Link to="/home">
                    <button>Enter the site</button>
                </Link>
            </div>
            
        </div>
    )
}