import { useNavigate } from "react-router-dom"


function Navbarr() {
  const navigate=useNavigate();
  return (
    <div>
      <nav className="navbar bg-body-tertiary h-3">
  <div className="container-fluid">
    <p className="navbar-brand" >Foodie</p>
    <form className="d-flex" role="search">
   <div className="d-flex gap-3"> <button className="btn btn-primary" onClick={()=>{navigate("/signup")}}>Signup</button>
   <button className="btn btn-secondary" onClick={()=>{navigate("/signin")}} style={{marginRight:"15px"}}>Sigin</button>
   
   </div>
      
    </form>
  </div>
</nav> 

</div>

  
  )
}

export default Navbarr
