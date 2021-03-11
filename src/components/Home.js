import React from 'react';

function Home(){
    return(
        <div className="home-div">
            <div className="home-h1-div">
                <h1>Share Your Memories and Love From</h1>
                <h1>Sky - Children of The Light</h1>
                <h1>In Skyup With Your Dear Friends</h1>
                <a href="https://picrew.me/image_maker/439951"><p>Make your sky kid avatar here! <i class="far fa-user-circle"></i></p></a>
            </div>
            <div className="home-pic-div">
                <img src={process.env.PUBLIC_URL + "/home_image/home7.jpg"} alt="skyup"/>
                <img src={process.env.PUBLIC_URL + "/home_image/home1.jpg"} alt="skyup"/>
                <img src={process.env.PUBLIC_URL + "/home_image/home2.jpg"} alt="skyup"/>
                <img src={process.env.PUBLIC_URL + "/home_image/home11.jpg"} alt="skyup"/>
                <img src={process.env.PUBLIC_URL + "/home_image/home3.jpg"} alt="skyup"/>
                <img src={process.env.PUBLIC_URL + "/home_image/home4.jpg"} alt="skyup"/>
                <img src={process.env.PUBLIC_URL + "/home_image/home9.jpg"} alt="skyup"/>
                <img src={process.env.PUBLIC_URL + "/home_image/home5.jpg"} alt="skyup"/>
                <img src={process.env.PUBLIC_URL + "/home_image/home8.jpg"} alt="skyup"/>
                <img src={process.env.PUBLIC_URL + "/home_image/dinner.jpg"} alt="skyup"/>
                <img src={process.env.PUBLIC_URL + "/home_image/home10.jpg"} alt="skyup"/>
                {/* <img src={process.env.PUBLIC_URL + "/home_image/home6.jpg"} alt="skyup"/> */}
            </div>
        </div>
    )

}
export default Home;