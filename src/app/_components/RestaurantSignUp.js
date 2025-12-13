const RestaurantSignUp = () =>{
    return(
        <>
         <h3>SignUp Component</h3>
        <div>
            <div className="input-wrapper">
            <input className="input-field" type="text" name="" id="" placeholder="Enter Email Id" />
            </div>
            <div className="input-wrapper">
            <input className="input-field" type="password" name="" id="" placeholder="Enter Password" />
            </div>
            <div className="input-wrapper">
            <input className="input-field" type="password" name="" id="" placeholder="Confirm Password" />
            </div>
            <div className="input-wrapper">
            <input className="input-field" type="password" name="" id="" placeholder="Enter restaurant name" />
            </div>
            <div className="input-wrapper">
            <input className="input-field" type="password" name="" id="" placeholder="Enter city" />
            </div>
            <div className="input-wrapper">
            <input className="input-field" type="password" name="" id="" placeholder="Enter full address" />
            </div>
            <div className="input-wrapper">
            <input className="input-field" type="password" name="" id="" placeholder="Enter contact no." />
            </div>
            <div className="input-wrapper">
                <button className="button">Sign UP</button>
            </div>
        </div>
        </>
    )
}

export default RestaurantSignUp